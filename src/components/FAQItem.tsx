import React, { useState } from "react"

const Arrow = ({ active }: { active: boolean }) => (
    <div className="h-4 w-4 relative">
        <svg
            className={`h-4 w-4 absolute top-1/3 transition-all duration-500 ${
                active ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
            }`}
            width="22"
            height="11"
            viewBox="0 0 22 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21.2129 10.6067H-0.000310659L10.6063 8.88109e-05L21.2129 10.6067Z" fill="#26DB8D" />
        </svg>

        <svg
            className={`h-4 w-4 absolute top-1/3 transition-all duration-500 ${
                active ? "opacity-0 -rotate-180" : "opacity-100 rotate-0"
            }`}
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0.606689H21.2132L10.6066 11.2133L0 0.606689Z" fill="#26DB8D" />
        </svg>
    </div>
)

type FAQItemProps = {
    question: string
    answer: React.ReactElement
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [active, setActive] = useState(false)
    return (
        <div
            className="text-Content_gray"
            onClick={() => setActive(!active)}
            onKeyPress={() => setActive(!active)}
            role="button"
            tabIndex={0}
        >
            <div className="font-bold text-[22px] py-2 flex items-center justify-between">
                <div>{question}</div>
                <div>
                    <Arrow active={active} />
                </div>
            </div>
            <div
                className={`transition-[padding] duration-500  ${
                    active ? "h-auto pt-4 pb-6" : "max-h-0 overflow-hidden py-0"
                }`}
            >
                {answer}
            </div>
            <div className="border-b"/>
        </div>
    )
}

export default FAQItem
