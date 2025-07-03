import React from 'react';
import {
  CheckCircle,
  ArrowRight,
  Brain,
  Trophy,
  BarChart3,
  Users,
  PlayCircle,
  Star,
  Zap,
  Target,
  Award,
} from "lucide-react";
import Link from 'next/link';

export default function QuizAppLanding() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Questions",
      description:
        "AI-powered question generation with multiple difficulty levels and adaptive learning paths.",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Achievement System",
      description:
        "Earn badges, unlock levels, and compete with friends through our gamified learning experience.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Progress Analytics",
      description:
        "Track your learning journey with detailed analytics and personalized insights.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Questions" },
    { number: "50+", label: "Categories" },
    { number: "5K+", label: "Active Users" },
    { number: "98%", label: "Satisfaction" },
  ];

  const sampleQuestions = [
    { question: "What is the capital of France?", category: "Geography", difficulty: "Easy" },
    { question: "Solve: 2x + 5 = 13", category: "Mathematics", difficulty: "Medium" },
    { question: "Who wrote '1984'?", category: "Literature", difficulty: "Medium" },
    { question: "What is photosynthesis?", category: "Science", difficulty: "Hard" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-900 to-orange-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/15 to-red-400/15 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
          
          {/* Geometric Patterns */}
          <div className="absolute inset-2 opacity-25 md:hidden">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Diagonal Lines */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, #f59e0b 50px, #f59e0b 52px)',
            }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm text-yellow-200 text-sm font-medium border border-yellow-400/30">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  Interactive Learning Experience
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Master any 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 block sm:inline"> subject</span>
                <span className="block">with ZapQuiz</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-orange-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Challenge yourself with thousands of questions across multiple categories. Learn, compete, and track your progress with our intelligent quiz platform.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link href='/register' className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-semibold flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:shadow-orange-400/50 hover:scale-105 hover:-translate-y-1">
                  <PlayCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Quiz Now
                </Link>

                <Link href='/login' className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-orange-300/30 bg-white/10 backdrop-blur-sm font-semibold hover:bg-white/20 transition-all duration-300 text-orange-100 hover:border-orange-300/50 hover:scale-105">
                  Login
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{stat.number}</div>
                    <div className="text-sm text-orange-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quiz Interface Mockup */}
            <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none relative">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20 hover:shadow-black/30 transition-all duration-500">
                {/* Window Controls */}
                <div className="h-12 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 backdrop-blur-sm flex items-center px-6 border-b border-white/10">
                  <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm text-white/70 font-medium">ZapQuiz</span>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  {/* Quiz Header */}
                  <div className="mb-6 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-yellow-300">Question 3 of 10</span>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-orange-300 font-medium">Science</span>
                      </div>
                    </div>
                    <div className="w-full bg-orange-900/50 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full w-3/10 shadow-lg transition-all duration-700"></div>
                    </div>
                  </div>
                  
                  {/* Question */}
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-yellow-400/20">
                    <h3 className="text-xl font-bold text-white mb-4">
                      What is the chemical symbol for Gold?
                    </h3>
                    
                    {/* Answer Options */}
                    <div className="space-y-3">
                      {['A) Gd', 'B) Au', 'C) Ag', 'D) Go'].map((option, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                            i === 1 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-400 shadow-xl shadow-orange-500/30 scale-105' 
                              : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-white hover:border-white/40 hover:scale-102'
                          }`}
                        >
                          <span className="font-medium">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Next Question
                    </button>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-orange-200 rounded-xl border border-white/20 font-medium hover:bg-white/20 transition-all duration-300">
                      Skip
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl"></div>
              
              {/* Achievement Notification */}
              <div className="absolute -bottom-4 -left-4 sm:-left-12 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Streak Bonus!</div>
                    <div className="text-xs text-gray-600">5 correct answers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-black/20 backdrop-blur-sm py-24 relative overflow-hidden border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Everything you need to excel
            </h2>
            <p className="text-lg sm:text-xl text-orange-200 max-w-2xl mx-auto">
              Powerful features designed to make learning engaging and effective
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 border border-white/20 hover:bg-white/15 group hover:scale-105 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-orange-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-orange-800/50 to-yellow-800/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-1 shadow-2xl shadow-black/30">
              <div className="bg-gradient-to-br from-orange-900/95 to-yellow-900/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                      Ready to challenge yourself?
                    </h2>
                    <p className="text-lg sm:text-xl text-orange-200 mb-8 leading-relaxed">
                      Join thousands of learners who are already improving their knowledge through our interactive quiz platform.
                    </p>
                    <ul className="space-y-4 mb-10">
                      {[
                        "Personalized difficulty adjustment",
                        "Real-time progress tracking",
                        "Multiplayer quiz battles",
                        "Comprehensive score analytics"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-left">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-orange-100 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href='/register' className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                      Start Your First Quiz
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                  
                  {/* Quiz Stats Demo */}
                  <div className="relative">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-xl sm:text-2xl font-bold text-white">Your Progress</div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Progress Stats */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                          <span className="text-orange-200 font-medium">Questions Answered</span>
                          <span className="font-bold text-yellow-400 text-lg">247</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                          <span className="text-orange-200 font-medium">Accuracy Rate</span>
                          <span className="font-bold text-green-400 text-lg">87%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                          <span className="text-orange-200 font-medium">Current Streak</span>
                          <span className="font-bold text-yellow-400 text-lg">12</span>
                        </div>
                      </div>
                      
                      {/* Recent Categories */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-orange-300 mb-3">Recent Categories</h4>
                        {sampleQuestions.slice(0, 3).map((q, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                          >
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                            <span className="text-white font-medium truncate flex-1">{q.category}</span>
                            <span className="text-xs text-yellow-400 font-semibold px-2 py-1 bg-yellow-500/20 rounded-full">{q.difficulty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Begin your learning adventure
            </h2>
            <p className="text-xl sm:text-2xl opacity-90 mb-10 leading-relaxed">
              Discover what you know and learn what you don't. Start your first quiz now!
            </p>
            <Link href='/register' className="px-10 py-5 rounded-2xl bg-white/95 backdrop-blur-sm text-orange-600 font-bold text-lg hover:shadow-2xl hover:shadow-orange-700/40 transition-all duration-300 hover:bg-white hover:scale-105 hover:-translate-y-1">
              Get Started For Free
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-900 to-yellow-900 text-orange-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">ZapQuiz</h3>
            </div>
            <p className="mb-8 text-lg text-orange-200">Challenge your mind, expand your knowledge</p>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
              {["About", "Categories", "Leaderboard", "Support"].map((item, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors text-orange-200 font-medium text-lg hover:scale-105 transition-transform duration-200">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-orange-300">© {new Date().getFullYear()} ZapQuiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}