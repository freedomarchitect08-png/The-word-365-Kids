import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Book, Trophy, Play, Pause, ChevronRight, Lock, Star, Heart, Crown, Award, Gift, Sun, Moon, Zap } from 'lucide-react';

// Story Collections Data
const storyCollections = {
  free: {
    name: "Free Stories",
    description: "Start your faith journey here",
    stories: [
      {
        id: 1,
        title: "David and Goliath",
        description: "The ultimate underdog story about a brave shepherd boy who defeats a giant with faith.",
        collection: "Heroes of Faith",
        duration: "7 min",
        audioUrl: "david-goliath.mp3",
        content: "Long ago in Israel, there was a young shepherd boy named David. He was brave and loved God with all his heart. One day, a giant soldier named Goliath challenged the Israelite army. Goliath was over nine feet tall and wore heavy armor. All the soldiers were afraid, but not David. David knew God was with him. He chose five smooth stones from a stream and his sling. When Goliath laughed at him, David said 'You come with a sword, but I come in the name of the Lord!' David swung his sling, and the stone hit Goliath right in the forehead. The giant fell, and David won! This teaches us that with God, we can face any giant in our lives.",
        questions: [
          "What made David brave enough to face Goliath?",
          "What giants (big problems) are you facing?",
          "How can faith help you be brave?"
        ],
        verse: "The Lord is my strength and my shield. - Psalm 28:7"
      },
      {
        id: 2,
        title: "Noah's Ark",
        description: "An adventure story about trusting God through the flood.",
        collection: "Creation & Beginnings",
        duration: "8 min",
        audioUrl: "noahs-ark.mp3",
        content: "Noah was a good man who loved God. But the world had become full of people doing wrong things. God told Noah to build a huge boat called an ark because He was going to send a flood. Noah obeyed, even though people laughed at him. He built the ark exactly as God said. Then God sent two of every kind of animal to Noah - elephants, lions, birds, and even tiny insects! When everyone was safely inside, the rain started. It rained for forty days and forty nights! The water covered everything. But Noah, his family, and all the animals were safe inside the ark. After many months, the water went down. Noah sent out a dove, and it came back with an olive branch - dry land! God made a rainbow as a promise to never flood the whole earth again. This teaches us to trust and obey God, even when things don't make sense.",
        questions: [
          "Why did Noah build the ark even when people laughed?",
          "What does the rainbow remind us about God?",
          "How can you trust God when things are hard?"
        ],
        verse: "Trust in the Lord with all your heart. - Proverbs 3:5"
      },
      {
        id: 3,
        title: "Daniel and the Lions",
        description: "A story of courage and faith when facing danger.",
        collection: "Heroes of Faith",
        duration: "6 min",
        audioUrl: "daniel-lions.mp3",
        content: "Daniel loved God and prayed three times every day. He lived in a kingdom where the king made a new law: no one could pray to anyone except the king for thirty days. But Daniel kept praying to God by his window. Some jealous men saw him and told the king. The king liked Daniel but had to follow his own law. Sadly, he had to throw Daniel into a den of hungry lions. The king couldn't sleep that night. In the morning, he ran to the lions' den and called out, 'Daniel! Did your God save you?' Daniel answered, 'Yes! God sent an angel to shut the lions' mouths. They didn't hurt me!' The king was so happy! He made a new law that everyone should respect Daniel's God. This teaches us to keep doing what's right, even when it's hard.",
        questions: [
          "Why did Daniel keep praying even when it was dangerous?",
          "How did God protect Daniel?",
          "When is it hard for you to do the right thing?"
        ],
        verse: "Be strong and courageous. Do not be afraid. - Joshua 1:9"
      },
      {
        id: 4,
        title: "The Good Samaritan",
        description: "Jesus teaches about loving and helping others.",
        collection: "Jesus' Parables",
        duration: "5 min",
        audioUrl: "good-samaritan.mp3",
        content: "One day, Jesus told a story to teach about being kind. A man was walking on a road when robbers attacked him and left him hurt. A priest walked by and saw the man but crossed to the other side. Then a temple helper came, looked, and also walked away. Finally, a Samaritan man came along. Now, Samaritans and Jews usually didn't like each other. But this Samaritan felt sorry for the hurt man. He bandaged his wounds, put him on his donkey, and took him to an inn. He even paid for the man to stay there until he got better! Jesus asked, 'Which one was a good neighbor?' Everyone agreed it was the Samaritan who helped. Jesus said, 'Go and do the same!' This teaches us to be kind and helpful to everyone, even people who are different from us.",
        questions: [
          "Why did the Samaritan help when others didn't?",
          "Who can you help this week?",
          "How does it feel to help someone?"
        ],
        verse: "Love your neighbor as yourself. - Matthew 22:39"
      }
    ]
  },
  paid: [
    {
      id: "creation",
      name: "Creation & Beginnings",
      icon: Sun,
      color: "from-amber-400 to-orange-500",
      storyCount: 8,
      locked: true
    },
    {
      id: "moses",
      name: "Moses & The Exodus",
      icon: Zap,
      color: "from-blue-400 to-purple-500",
      storyCount: 12,
      locked: true
    },
    {
      id: "heroes",
      name: "Heroes of Faith",
      icon: Crown,
      color: "from-purple-400 to-pink-500",
      storyCount: 15,
      locked: true
    },
    {
      id: "kings",
      name: "Kings & Prophets",
      icon: Award,
      color: "from-indigo-400 to-blue-500",
      storyCount: 10,
      locked: true
    },
    {
      id: "jesus-birth",
      name: "Jesus' Birth & Early Life",
      icon: Star,
      color: "from-yellow-400 to-amber-500",
      storyCount: 6,
      locked: true
    },
    {
      id: "miracles",
      name: "Jesus' Miracles",
      icon: Sparkles,
      color: "from-cyan-400 to-blue-500",
      storyCount: 15,
      locked: true
    },
    {
      id: "parables",
      name: "Jesus' Parables",
      icon: Book,
      color: "from-green-400 to-emerald-500",
      storyCount: 12,
      locked: true
    },
    {
      id: "teachings",
      name: "Jesus' Teachings",
      icon: Heart,
      color: "from-rose-400 to-pink-500",
      storyCount: 10,
      locked: true
    }
  ]
};

// Sticker rewards system
const stickerRewards = [
  { id: 1, name: "Faith Starter", icon: Star, requirement: 1, color: "text-yellow-500" },
  { id: 2, name: "Story Explorer", icon: Book, requirement: 3, color: "text-blue-500" },
  { id: 3, name: "Bible Hero", icon: Crown, requirement: 5, color: "text-purple-500" },
  { id: 4, name: "Brave Heart", icon: Heart, requirement: 8, color: "text-pink-500" },
  { id: 5, name: "Faith Champion", icon: Trophy, requirement: 12, color: "text-amber-500" },
  { id: 6, name: "Story Master", icon: Award, requirement: 15, color: "text-indigo-500" },
  { id: 7, name: "Light Shiner", icon: Sparkles, requirement: 20, color: "text-cyan-500" },
  { id: 8, name: "Wisdom Keeper", icon: Gift, requirement: 25, color: "text-emerald-500" }
];

export default function KidsBibleApp() {
  const [currentView, setCurrentView] = useState('home'); // home, story, progress
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedStories, setCompletedStories] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Load progress from storage
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const result = await window.storage.get('kids_bible_progress');
        if (result && result.value) {
          const data = JSON.parse(result.value);
          setCompletedStories(data.completed || []);
        }
      } catch (error) {
        console.log('No saved progress yet');
      }
    };
    loadProgress();
  }, []);

  // Save progress
  const saveProgress = async (completed) => {
    try {
      await window.storage.set('kids_bible_progress', JSON.stringify({
        completed,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // Mark story as complete
  const completeStory = (storyId) => {
    if (!completedStories.includes(storyId)) {
      const updated = [...completedStories, storyId];
      setCompletedStories(updated);
      saveProgress(updated);
      // Show celebration animation
      setTimeout(() => {
        alert('🎉 Story Complete! Check your stickers!');
      }, 500);
    }
  };

  // Audio controls
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (selectedStory) {
      completeStory(selectedStory.id);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate earned stickers
  const earnedStickers = stickerRewards.filter(
    sticker => completedStories.length >= sticker.requirement
  );

  // Views
  const renderHome = () => (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="relative">
            <Book className="w-16 h-16 text-gold-500" strokeWidth={1.5} />
            <Sparkles className="w-6 h-6 text-gold-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>
        <h1 className="font-display text-4xl text-navy-900">
          Bible Stories
        </h1>
        <p className="font-body text-navy-600 max-w-md mx-auto">
          Discover amazing stories about faith, courage, and love
        </p>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-gold-400/20 to-gold-500/20 rounded-3xl p-6 border border-gold-300/30">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-display text-sm text-navy-600">Your Progress</p>
            <p className="font-display text-3xl text-navy-900">
              {completedStories.length} Stories
            </p>
            <p className="font-body text-sm text-navy-500">
              {earnedStickers.length} Stickers Earned
            </p>
          </div>
          <button
            onClick={() => setCurrentView('progress')}
            className="bg-gold-500 hover:bg-gold-600 text-white p-4 rounded-full transition-all hover:scale-110"
          >
            <Trophy className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Free Stories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy-900">
            Start Here - Free Stories
          </h2>
          <Sparkles className="w-5 h-5 text-gold-500" />
        </div>
        <div className="grid gap-4">
          {storyCollections.free.stories.map((story) => (
            <button
              key={story.id}
              onClick={() => {
                setSelectedStory(story);
                setCurrentView('story');
                setIsPlaying(false);
              }}
              className="bg-white rounded-2xl p-5 border-2 border-navy-100 hover:border-gold-400 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {completedStories.includes(story.id) && (
                      <div className="bg-gold-500 text-white rounded-full p-1">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    )}
                    <h3 className="font-display text-lg text-navy-900 group-hover:text-gold-600 transition-colors">
                      {story.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-navy-600 line-clamp-2">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-navy-500">
                    <span className="flex items-center gap-1">
                      <Book className="w-3 h-3" />
                      {story.collection}
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {story.duration}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-navy-400 group-hover:text-gold-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Collections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy-900">
            Premium Collections
          </h2>
          <div className="flex items-center gap-2 bg-gold-500/10 px-3 py-1 rounded-full">
            <Lock className="w-4 h-4 text-gold-600" />
            <span className="font-display text-sm text-gold-600">120+ Stories</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {storyCollections.paid.map((collection) => {
            const IconComponent = collection.icon;
            return (
              <div
                key={collection.id}
                className="relative bg-white rounded-2xl p-5 border-2 border-navy-100 opacity-75"
              >
                <div className="absolute top-3 right-3">
                  <Lock className="w-4 h-4 text-navy-400" />
                </div>
                <div className={`inline-flex bg-gradient-to-br ${collection.color} p-3 rounded-xl mb-3`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-sm text-navy-900 mb-1">
                  {collection.name}
                </h3>
                <p className="font-body text-xs text-navy-500">
                  {collection.storyCount} stories
                </p>
              </div>
            );
          })}
        </div>
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl p-6 text-center space-y-4">
          <Crown className="w-12 h-12 text-gold-400 mx-auto" />
          <div className="space-y-2">
            <h3 className="font-display text-xl text-white">
              Unlock Full Library
            </h3>
            <p className="font-body text-sm text-ivory-200">
              Get 120+ Bible stories, monthly new content, and premium features
            </p>
          </div>
          <button className="bg-gold-500 hover:bg-gold-600 text-white font-display px-8 py-3 rounded-full transition-all hover:scale-105">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderStory = () => {
    if (!selectedStory) return null;

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const isComplete = completedStories.includes(selectedStory.id);

    return (
      <div className="min-h-screen p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => {
            setCurrentView('home');
            setSelectedStory(null);
            setIsPlaying(false);
          }}
          className="flex items-center gap-2 text-navy-600 hover:text-navy-900 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="font-display">Back to Stories</span>
        </button>

        {/* Story Header */}
        <div className="bg-gradient-to-br from-gold-50 to-ivory-50 rounded-3xl p-6 border border-gold-200/50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {isComplete && (
                  <div className="bg-gold-500 text-white rounded-full p-1.5">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                )}
                <span className="font-body text-sm text-navy-600">
                  {selectedStory.collection}
                </span>
              </div>
              <h1 className="font-display text-3xl text-navy-900 mb-2">
                {selectedStory.title}
              </h1>
              <p className="font-body text-navy-600">
                {selectedStory.description}
              </p>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-white rounded-2xl p-6 space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="bg-gold-500 hover:bg-gold-600 text-white p-4 rounded-full transition-all hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <div className="flex-1 mx-6">
                <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-navy-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{selectedStory.duration}</span>
                </div>
              </div>
            </div>

            {/* Hidden audio element for demo */}
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              src={selectedStory.audioUrl}
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-3xl p-6 border border-navy-100 space-y-6">
          <div className="space-y-4">
            <h2 className="font-display text-xl text-navy-900 flex items-center gap-2">
              <Book className="w-5 h-5 text-gold-500" />
              The Story
            </h2>
            <div className="font-body text-navy-700 leading-relaxed text-lg">
              {selectedStory.content.split('. ').map((sentence, idx) => (
                <p key={idx} className="mb-4">{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
              ))}
            </div>
          </div>

          {/* Discussion Questions */}
          <div className="border-t border-navy-100 pt-6 space-y-4">
            <h2 className="font-display text-xl text-navy-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-500" />
              Think About It
            </h2>
            <div className="space-y-3">
              {selectedStory.questions.map((question, idx) => (
                <div key={idx} className="bg-gold-50 rounded-xl p-4">
                  <p className="font-body text-navy-700">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Verse */}
          <div className="border-t border-navy-100 pt-6">
            <h2 className="font-display text-xl text-navy-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-500" />
              Remember This
            </h2>
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-center">
              <p className="font-display text-xl text-gold-400 italic">
                "{selectedStory.verse}"
              </p>
            </div>
          </div>
        </div>

        {/* Complete Story Button */}
        {!isComplete && (
          <button
            onClick={() => completeStory(selectedStory.id)}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-display text-lg py-4 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
          >
            Mark as Complete ⭐
          </button>
        )}
      </div>
    );
  };

  const renderProgress = () => (
    <div className="min-h-screen p-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-2 text-navy-600 hover:text-navy-900 transition-colors"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        <span className="font-display">Back Home</span>
      </button>

      {/* Progress Header */}
      <div className="text-center space-y-3">
        <Trophy className="w-16 h-16 text-gold-500 mx-auto" />
        <h1 className="font-display text-4xl text-navy-900">
          Your Journey
        </h1>
        <p className="font-body text-navy-600">
          Keep going! Collect all the stickers!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gold-400/20 to-gold-500/20 rounded-2xl p-6 border border-gold-300/30 text-center">
          <div className="font-display text-4xl text-navy-900 mb-1">
            {completedStories.length}
          </div>
          <div className="font-body text-sm text-navy-600">
            Stories Read
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-400/20 to-purple-500/20 rounded-2xl p-6 border border-purple-300/30 text-center">
          <div className="font-display text-4xl text-navy-900 mb-1">
            {earnedStickers.length}
          </div>
          <div className="font-body text-sm text-navy-600">
            Stickers Earned
          </div>
        </div>
      </div>

      {/* Sticker Collection */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-navy-900">
          Your Sticker Collection
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {stickerRewards.map((sticker) => {
            const StickerIcon = sticker.icon;
            const isEarned = earnedStickers.some(s => s.id === sticker.id);
            
            return (
              <div
                key={sticker.id}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  isEarned
                    ? 'bg-white border-gold-400 shadow-lg scale-105'
                    : 'bg-navy-50 border-navy-200 opacity-50'
                }`}
              >
                <div className={`${sticker.color} mb-3 ${isEarned ? 'animate-pulse' : ''}`}>
                  <StickerIcon className="w-12 h-12" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm text-navy-900 mb-1">
                  {sticker.name}
                </h3>
                <p className="font-body text-xs text-navy-600">
                  {isEarned ? '✨ Earned!' : `${sticker.requirement} stories needed`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Sticker Goal */}
      {earnedStickers.length < stickerRewards.length && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200/50">
          <div className="text-center space-y-3">
            <Sparkles className="w-10 h-10 text-purple-500 mx-auto" />
            <h3 className="font-display text-xl text-navy-900">
              Next Sticker Goal
            </h3>
            <p className="font-body text-navy-600">
              Read {stickerRewards[earnedStickers.length].requirement - completedStories.length} more {completedStories.length === stickerRewards[earnedStickers.length].requirement - 1 ? 'story' : 'stories'} to earn{' '}
              <span className="font-display text-purple-600">
                {stickerRewards[earnedStickers.length].name}
              </span>
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-display px-6 py-3 rounded-full transition-all hover:scale-105"
            >
              Keep Reading!
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="kids-bible-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
        
        .kids-bible-app {
          --gold-50: #FFFBF0;
          --gold-100: #FFF3D4;
          --gold-200: #FFE9B3;
          --gold-300: #FFDD8C;
          --gold-400: #FFD166;
          --gold-500: #D4AF37;
          --gold-600: #B8941F;
          
          --ivory-50: #FFFFF0;
          --ivory-100: #FFFEF7;
          --ivory-200: #FFFCE8;
          
          --navy-50: #F0F4F8;
          --navy-100: #D9E2EC;
          --navy-200: #BCCCDC;
          --navy-400: #486581;
          --navy-500: #334E68;
          --navy-600: #243B53;
          --navy-700: #102A43;
          --navy-800: #0A1F35;
          --navy-900: #000080;
          
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, var(--ivory-50) 0%, var(--gold-50) 100%);
          min-height: 100vh;
        }
        
        .font-display {
          font-family: 'Fredoka', cursive;
          font-weight: 600;
        }
        
        .font-body {
          font-family: 'Outfit', sans-serif;
        }
        
        .text-gold-400 { color: var(--gold-400); }
        .text-gold-500 { color: var(--gold-500); }
        .text-gold-600 { color: var(--gold-600); }
        .text-navy-400 { color: var(--navy-400); }
        .text-navy-500 { color: var(--navy-500); }
        .text-navy-600 { color: var(--navy-600); }
        .text-navy-700 { color: var(--navy-700); }
        .text-navy-900 { color: var(--navy-900); }
        .text-ivory-200 { color: var(--ivory-200); }
        
        .bg-gold-50 { background-color: var(--gold-50); }
        .bg-gold-500 { background-color: var(--gold-500); }
        .bg-gold-600 { background-color: var(--gold-600); }
        .bg-navy-50 { background-color: var(--navy-50); }
        .bg-navy-100 { background-color: var(--navy-100); }
        .bg-navy-800 { background-color: var(--navy-800); }
        .bg-navy-900 { background-color: var(--navy-900); }
        
        .border-gold-200\/50 { border-color: rgb(255 233 179 / 0.5); }
        .border-gold-300\/30 { border-color: rgb(255 221 140 / 0.3); }
        .border-gold-400 { border-color: var(--gold-400); }
        .border-navy-100 { border-color: var(--navy-100); }
        .border-navy-200 { border-color: var(--navy-200); }
        
        .from-gold-400\/20 { --tw-gradient-from: rgb(255 209 102 / 0.2); }
        .to-gold-500\/20 { --tw-gradient-to: rgb(212 175 55 / 0.2); }
        .from-gold-50 { --tw-gradient-from: var(--gold-50); }
        .to-ivory-50 { --tw-gradient-to: var(--ivory-50); }
        .from-gold-400 { --tw-gradient-from: var(--gold-400); }
        .to-gold-600 { --tw-gradient-to: var(--gold-600); }
        .from-navy-900 { --tw-gradient-from: var(--navy-900); }
        .to-navy-800 { --tw-gradient-to: var(--navy-800); }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {currentView === 'home' && renderHome()}
      {currentView === 'story' && renderStory()}
      {currentView === 'progress' && renderProgress()}
    </div>
  );
}
