import { useState, useEffect } from "react";
import { Trophy, RotateCcw, CheckCircle, XCircle, Brain, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What is the correct compression depth for adult CPR?",
    options: [
      "1-2 inches (2.5-5 cm)",
      "At least 2 inches (5 cm) but no more than 2.4 inches (6 cm)",
      "3-4 inches (7.5-10 cm)",
      "As deep as possible"
    ],
    correctAnswer: 1,
    explanation: "The American Heart Association recommends compression depth of at least 2 inches (5 cm) but no more than 2.4 inches (6 cm) for adult CPR.",
    category: "CPR"
  },
  {
    id: "2",
    question: "What should you do FIRST when someone is choking but can still cough?",
    options: [
      "Perform abdominal thrusts immediately",
      "Hit them on the back",
      "Encourage them to keep coughing",
      "Call 911 immediately"
    ],
    correctAnswer: 2,
    explanation: "If the person can still cough, encourage them to continue coughing as it's the most effective way to dislodge the object.",
    category: "Choking"
  },
  {
    id: "3",
    question: "For a minor burn, how long should you cool it with running water?",
    options: [
      "2-3 minutes",
      "5-10 minutes",
      "10-20 minutes",
      "30 minutes"
    ],
    correctAnswer: 2,
    explanation: "Cool minor burns with cool (not cold) running water for 10-20 minutes to reduce pain and prevent further tissue damage.",
    category: "Burns"
  },
  {
    id: "4",
    question: "What does the 'F' in FAST (stroke recognition) stand for?",
    options: [
      "Fever",
      "Face drooping",
      "Fingers tingling", 
      "Feeling dizzy"
    ],
    correctAnswer: 1,
    explanation: "FAST stands for Face drooping, Arm weakness, Speech difficulties, and Time to call emergency services.",
    category: "Stroke"
  },
  {
    id: "5",
    question: "When controlling severe bleeding, what should you do if blood soaks through the bandage?",
    options: [
      "Remove the bandage and apply a new one",
      "Apply more bandages on top of the first one", 
      "Apply a tourniquet immediately",
      "Reduce the pressure"
    ],
    correctAnswer: 1,
    explanation: "Never remove a blood-soaked bandage as it may disrupt clot formation. Instead, apply additional bandages on top and continue pressure.",
    category: "Bleeding"
  },
  {
    id: "6",
    question: "What is the recommended compression-to-ventilation ratio for adult CPR?",
    options: [
      "15:2",
      "30:2",
      "5:1",
      "Continuous compressions only"
    ],
    correctAnswer: 1,
    explanation: "The current recommendation for adult CPR is 30 chest compressions followed by 2 rescue breaths.",
    category: "CPR"
  },
  {
    id: "7",
    question: "If someone has a suspected spinal injury, what should you NOT do?",
    options: [
      "Call emergency services",
      "Keep the person still",
      "Move their head to check airways",
      "Monitor their breathing"
    ],
    correctAnswer: 2,
    explanation: "Never move someone with a suspected spinal injury unless they are in immediate danger. Moving their head could cause permanent paralysis.",
    category: "Spinal Injuries"
  },
  {
    id: "8",
    question: "What should you apply to a nosebleed to help stop it?",
    options: [
      "Tilt head back and apply ice to forehead",
      "Pinch nostrils closed and lean forward",
      "Insert gauze deep into the nostril",
      "Apply pressure to the bridge of the nose"
    ],
    correctAnswer: 1,
    explanation: "Pinch the soft part of the nostrils closed and lean forward to prevent blood from running down the throat.",
    category: "Bleeding"
  }
];

export function QuizSystem() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const startQuiz = () => {
    setIsQuizActive(true);
    setIsQuizComplete(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setResult(null);
    setShowExplanation(false);
    setStartTime(new Date());
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const showAnswerExplanation = () => {
    setShowExplanation(true);
  };

  const completeQuiz = () => {
    const endTime = new Date();
    const timeSpent = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;
    
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === quizQuestions[index].correctAnswer
    );
    
    const finalResult: QuizResult = {
      score: Math.round((correctAnswers.length / quizQuestions.length) * 100),
      totalQuestions: quizQuestions.length,
      timeSpent,
      correctAnswers: correctAnswers.map((_, index) => 
        selectedAnswers[index] === quizQuestions[index].correctAnswer ? index : -1
      ).filter(i => i !== -1)
    };

    setResult(finalResult);
    setIsQuizActive(false);
    setIsQuizComplete(true);

    // Show result toast
    if (finalResult.score >= 80) {
      toast({
        title: "🏆 Excellent Work!",
        description: `You scored ${finalResult.score}% - You're well-prepared for emergencies!`,
      });
    } else if (finalResult.score >= 60) {
      toast({
        title: "✅ Good Job!",
        description: `You scored ${finalResult.score}% - Consider reviewing some topics.`,
      });
    } else {
      toast({
        title: "📚 Keep Learning",
        description: `You scored ${finalResult.score}% - Practice makes perfect!`,
      });
    }
  };

  const retakeQuiz = () => {
    startQuiz();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-secondary";
    return "text-destructive";
  };

  if (!isQuizActive && !isQuizComplete) {
    return (
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-medical shadow-medical">
              <Brain className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle>Medical Knowledge Quiz</CardTitle>
              <CardDescription>Test your first aid knowledge</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="p-6 rounded-lg bg-muted/50">
              <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Test Your Knowledge?</h3>
              <p className="text-muted-foreground mb-4">
                Challenge yourself with {quizQuestions.length} questions covering essential first aid topics.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{quizQuestions.length} Questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="h-4 w-4 text-secondary" />
                  <span>~5 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span>Multiple Choice</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={startQuiz}
              size="lg"
              className="bg-gradient-medical hover:shadow-medical"
            >
              <Brain className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isQuizComplete && result) {
    return (
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-medical shadow-medical">
              <Trophy className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle>Quiz Complete!</CardTitle>
              <CardDescription>Your performance summary</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="p-6 rounded-lg bg-muted/50">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
              <p className="text-muted-foreground mb-4">
                {result.correctAnswers.length} out of {result.totalQuestions} correct
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Timer className="h-4 w-4 text-secondary" />
                  <span>Time: {formatTime(result.timeSpent)}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span>
                    {result.score >= 80 ? "Excellent!" : result.score >= 60 ? "Good!" : "Keep Learning!"}
                  </span>
                </div>
              </div>

              {result.score >= 80 && (
                <Badge className="bg-accent text-accent-foreground mb-4">
                  🏆 First Aid Expert
                </Badge>
              )}
              {result.score >= 60 && result.score < 80 && (
                <Badge className="bg-secondary text-secondary-foreground mb-4">
                  ✅ Well Prepared  
                </Badge>
              )}
              {result.score < 60 && (
                <Badge variant="outline" className="mb-4">
                  📚 Room for Improvement
                </Badge>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={retakeQuiz}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button 
                onClick={() => {
                  setIsQuizComplete(false);
                  setIsQuizActive(false);
                }}
                className="flex-1 bg-gradient-medical hover:shadow-medical"
              >
                <Trophy className="mr-2 h-4 w-4" />
                New Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = hasAnswered && selectedAnswers[currentQuestion] === question.correctAnswer;

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-medical shadow-medical">
              <Brain className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
              <CardDescription>{question.category}</CardDescription>
            </div>
          </div>
          <Badge variant="outline">
            {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
          </Badge>
        </div>
        <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold leading-relaxed">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonVariant: "outline" | "default" | "destructive" = "outline";
              let buttonClass = "";
              
              if (hasAnswered) {
                if (index === question.correctAnswer) {
                  buttonVariant = "default";
                  buttonClass = "bg-accent hover:bg-accent text-accent-foreground";
                } else if (index === selectedAnswers[currentQuestion] && index !== question.correctAnswer) {
                  buttonVariant = "destructive";
                }
              } else if (selectedAnswers[currentQuestion] === index) {
                buttonVariant = "default";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className={`w-full text-left justify-start h-auto p-4 whitespace-normal ${buttonClass}`}
                  onClick={() => !hasAnswered && selectAnswer(index)}
                  disabled={hasAnswered}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-sm font-medium mt-0.5">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {hasAnswered && index === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-accent-foreground flex-shrink-0" />
                    )}
                    {hasAnswered && index === selectedAnswers[currentQuestion] && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-destructive-foreground flex-shrink-0" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {hasAnswered && showExplanation && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-2">Explanation:</p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          {hasAnswered ? (
            <>
              {!showExplanation ? (
                <Button onClick={showAnswerExplanation} variant="outline">
                  Show Explanation
                </Button>
              ) : (
                <div />
              )}
              <Button 
                onClick={nextQuestion}
                className="bg-gradient-medical hover:shadow-medical"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
              </Button>
            </>
          ) : (
            <div className="w-full text-center text-muted-foreground text-sm">
              Select an answer to continue
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}