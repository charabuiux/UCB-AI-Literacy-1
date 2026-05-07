"use client";

import { useAppStore } from "@/lib/store";
import { modules } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ModulePlayer({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { userRole, markModuleComplete, completedModules } = useAppStore();
  const router = useRouter();
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!userRole) {
      router.push("/");
    }
  }, [userRole, router]);

  if (!userRole) return null;

  const module = modules.find((m) => m.slug === resolvedParams.slug);

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const isCompleted = completedModules.includes(module.id);
  const currentModuleIndex = modules.findIndex(m => m.id === module.id);
  const nextModule = modules[currentModuleIndex + 1];

  const handleKnowledgeCheckSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    markModuleComplete(module.id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 w-full">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold tracking-wider text-[var(--color-california-gold)] uppercase">
            Phase {module.phase} &bull; Module {module.id}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{module.title}</h1>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
          <h3 className="font-semibold text-[var(--color-berkeley-blue)] mb-2">Learning Objectives</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {module.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      </div>

      <div 
        className="prose prose-slate max-w-none mb-12 prose-headings:text-[var(--color-berkeley-blue)] prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: module.content }}
      />

      <div className="border-t border-slate-200 pt-10 mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Knowledge Check</h2>
        {module.knowledgeCheck.map((kc, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="font-medium text-lg text-slate-800 mb-4">{kc.question}</p>
            <div className="space-y-3">
              {kc.options.map((option, optIdx) => (
                <label 
                  key={optIdx} 
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswer === optIdx ? 'border-[var(--color-berkeley-blue)] bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optIdx}
                    checked={selectedAnswer === optIdx}
                    onChange={() => {
                      if (!showResult) setSelectedAnswer(optIdx);
                    }}
                    disabled={showResult}
                    className="mt-1"
                  />
                  <span className="text-slate-700">{option}</span>
                </label>
              ))}
            </div>

            {!showResult ? (
              <button
                onClick={handleKnowledgeCheckSubmit}
                disabled={selectedAnswer === null}
                className="mt-6 px-6 py-2 bg-[var(--color-berkeley-blue)] text-white rounded-lg font-medium hover:bg-[var(--color-berkeley-blue-hover)] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === kc.answer ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                <p className="font-semibold flex items-center gap-2">
                  {selectedAnswer === kc.answer ? (
                    <>Correct!</>
                  ) : (
                    <>Not quite right. The correct answer was: {kc.options[kc.answer]}</>
                  )}
                </p>
                <p className="text-sm mt-1">
                  Module marked as complete. You can now return to the dashboard or proceed to the next module.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-slate-200 pt-6">
        <Link
          href="/dashboard"
          className="text-slate-600 hover:text-slate-900 font-medium transition"
        >
          Return to Dashboard
        </Link>
        {isCompleted && nextModule && nextModule.phase === module.phase && (
          <Link
            href={`/module/${nextModule.slug}`}
            className="px-6 py-2 bg-[var(--color-berkeley-blue)] text-white rounded-lg font-medium hover:bg-[var(--color-berkeley-blue-hover)] transition"
          >
            Next Module
          </Link>
        )}
      </div>
    </div>
  );
}
