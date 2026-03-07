import { useState, useEffect } from "react";

export const useLyrics = (lyricsUrl, currentTime) => {
  const [lyrics, setLyrics] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lyricsUrl) {
      setLyrics([]);
      setActiveLine(-1);
      setError(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchLyrics = async () => {
      try {
        const response = await fetch(lyricsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch lyrics");
        }
        const text = await response.text();

        const parsedLyrics = text
          .split("\n")
          .map((line) => {
            const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
            if (match) {
              const minutes = parseInt(match[1], 10);
              const seconds = parseFloat(match[2]);
              const textContent = match[3].trim();
              return { time: minutes * 60 + seconds, text: textContent };
            }
            return null;
          })
          .filter((line) => line !== null && line.text !== "");

        if (isMounted) {
          setLyrics(parsedLyrics);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Could not load lyrics");
          setLoading(false);
        }
      }
    };

    fetchLyrics();

    return () => {
      isMounted = false;
    };
  }, [lyricsUrl]);

  useEffect(() => {
    if (lyrics.length === 0) {
      setActiveLine(-1);
      return;
    }

    let activeIdx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= currentTime) {
        activeIdx = i;
      } else {
        break; // Lyrics are usually sorted by time, so we can stop early
      }
    }
    setActiveLine(activeIdx);
  }, [currentTime, lyrics]);

  return { lyrics, activeLine, loading, error };
};
