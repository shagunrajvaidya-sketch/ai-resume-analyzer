import { useState, type FormEvent } from 'react';
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions, AIResponseFormat } from "~/constants";

const Upload = () => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: {
        companyName: string; jobTitle: string; jobDescription: string; file: File;
    }) => {
        console.log("🔥 HANDLE ANALYZE CALLED");
        setIsProcessing(true);

        try {
            setStatusText('Uploading the file...');
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) throw new Error('Failed to upload file');
            console.log("STEP 3: file uploaded");

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if (!imageFile.file) throw new Error('Failed to convert PDF to image');
            console.log("STEP 5: PDF converted");

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) throw new Error('Failed to upload image');
            console.log("STEP 7: image uploaded");

            setStatusText('Preparing Data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            };
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            console.log("STEP 8: data saved");

            setStatusText('Analyzing...');
            console.log("STEP 9: calling AI with image path");

            // ✅ FIX: uploadedFile.path ki jagah uploadedImage.path bhejo
            let feedback;
            try {
                feedback = await ai.feedback(
                    uploadedImage.path,  // <-- IMAGE path, PDF nahi
                    prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
                );
            } catch (aiErr) {
                console.error("AI CALL FAILED:", aiErr);
                throw new Error('AI call failed - check console');
            }

            console.log("STEP 10: AI response received");
            console.log('RAW FEEDBACK:', JSON.stringify(feedback, null, 2));

            if (!feedback) throw new Error('AI returned null');

            const rawText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0]?.text || '';

            console.log('RAW TEXT:', rawText);
            if (!rawText) throw new Error('AI returned empty response');

            const cleanedText = rawText
                .replace(/```json/gi, '')
                .replace(/```/g, '')
                .trim();

            console.log('CLEANED:', cleanedText);

            let parsedFeedback;
            try {
                parsedFeedback = JSON.parse(cleanedText);
            } catch (parseErr) {
                console.error('JSON PARSE FAILED. Raw was:', cleanedText);
                throw new Error('AI response was not valid JSON');
            }

            data.feedback = parsedFeedback;
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            console.log("STEP 12: final data saved");

            setStatusText('Analysis complete, redirecting...');
            console.log('FINAL DATA:', data);
            navigate(`/resume/${uuid}`);

        } catch (error) {
            console.error('❌ ANALYSIS ERROR:', error);
            const msg = error instanceof Error ? error.message : 'Something went wrong';
            setStatusText(`Error: ${msg}`);
            setIsProcessing(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("🔥 HANDLE SUBMIT CALLED");

        const formData = new FormData(e.currentTarget);
        const companyName = (formData.get('company-name') as string) || 'Company';
        const jobTitle = (formData.get('job-title') as string) || 'Position';
        const jobDescription = (formData.get('job-description') as string) || '';

        console.log("FORM DATA:", { companyName, jobTitle, jobDescription, file });

        if (!file) {
            alert("Pehle resume PDF upload karo!");
            return;
        }

        await handleAnalyze({ companyName, jobTitle, jobDescription, file });
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your Dream Job</h1>

                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" alt="scanning" />
                        </>
                    ) : (
                        <h2>Drop your Resume for an ATS Score and Improvement Tips</h2>
                    )}

                    <form
                        id="upload-form"
                        onSubmit={handleSubmit}
                        className={`flex flex-col gap-4 mt-8 ${isProcessing ? 'hidden' : ''}`}
                    >
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                        </div>
                        <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                            <FileUploader onFileSelect={handleFileSelect} />
                        </div>
                        <button className="primary-button" type="submit">Analyze Resume</button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Upload;