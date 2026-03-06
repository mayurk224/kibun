import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playlist, setPlaylist] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    // Needs closure with latest state, so we use an event listener attached in a separate effect or use refs
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const playlistRef = useRef(playlist);
  const currentSongRef = useRef(currentSong);

  useEffect(() => {
    playlistRef.current = playlist;
  }, [playlist]);

  useEffect(() => {
    currentSongRef.current = currentSong;
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const pList = playlistRef.current;
      const curr = currentSongRef.current;
      if (!pList.length || !curr) {
        setIsPlaying(false);
        return;
      }
      const index = pList.findIndex((s) => s._id === curr._id);
      if (index !== -1 && index < pList.length - 1) {
        setCurrentSong(pList[index + 1]);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      // Check if source changed
      if (
        audioRef.current.src !== currentSong.musicUrl &&
        !currentSong.musicUrl.startsWith("blob:")
      ) {
        // just to avoid reloading same url
        audioRef.current.src = currentSong.musicUrl;
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // use a promise catch to avoid uncaught DOMException when interrupt happens
        var playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Auto-play was prevented or interrupted", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (song, currentPlaylist = []) => {
    if (currentPlaylist.length > 0) {
      setPlaylist(currentPlaylist);
    }
    if (currentSong?._id === song._id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const pList = playlistRef.current;
    const curr = currentSongRef.current;
    if (!pList.length || !curr) return;
    const index = pList.findIndex((s) => s._id === curr._id);
    if (index !== -1 && index < pList.length - 1) {
      setCurrentSong(pList[index + 1]);
    } else {
      setIsPlaying(false);
      setProgress(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  };

  const playPrev = () => {
    const pList = playlistRef.current;
    const curr = currentSongRef.current;
    if (!pList.length || !curr) return;

    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const index = pList.findIndex((s) => s._id === curr._id);
    if (index > 0) {
      setCurrentSong(pList[index - 1]);
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        volume,
        setVolume,
        playSong,
        togglePlay,
        playNext,
        playPrev,
        seek,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
