import React from "react";
import { cn } from "~/lib/utils";
import type { Feedback } from "~/types";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

type Tip = {
    type: "good" | "improve";
    tip: string;
    explanation: string;
};

const ScoreBadge = ({ score }: { score: number }) => {
    const colorClass =
        score > 69
            ? "bg-green-100 text-green-700"
            : score > 49
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

    const iconSrc =
        score > 69
            ? "/icons/check.svg"
            : "/icons/warning.svg";

    return (
        <div
            className={cn(
                "flex flex-row gap-1 items-center px-2.5 py-1 rounded-full",
                colorClass
            )}
        >
            <img src={iconSrc} alt="score" className="size-4" />
            <p className="text-sm font-semibold">{score}/100</p>
        </div>
    );
};

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore: number;
}) => (
    <div className="flex flex-row gap-4 items-center py-2">
        <p className="text-2xl font-semibold">{title}</p>
        <ScoreBadge score={categoryScore} />
    </div>
);

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Short tips summary — screenshot ke "Relevant technical skills" wala section */}
            <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {tips.map((tip, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={
                                tip.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt="tip"
                            className="size-5 shrink-0"
                        />
                        <p className="text-base text-gray-700">{tip.tip}</p>
                    </div>
                ))}
            </div>

            {/* Detailed explanations — screenshot ke color-coded boxes */}
            <div className="flex flex-col gap-3 w-full">
                {tips.map((tip, index) => (
                    <div
                        key={index + tip.tip}
                        className={cn(
                            "flex flex-col gap-2 rounded-2xl p-4 border",
                            tip.type === "good"
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-yellow-50 border-yellow-200 text-yellow-800"
                        )}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={
                                    tip.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt="tip"
                                className="size-5 shrink-0"
                            />
                            <p className="text-base font-semibold">{tip.tip}</p>
                        </div>
                        <p className="text-sm leading-relaxed pl-7">
                            {tip.explanation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Accordion>
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback.toneAndStyle.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader
                            title="Content"
                            categoryScore={feedback.content.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader
                            title="Structure"
                            categoryScore={feedback.structure.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader
                            title="Skills"
                            categoryScore={feedback.skills.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;