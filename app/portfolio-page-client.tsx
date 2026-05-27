"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  Music,
  Palette,
  MonitorCog,
  Film,
  ExternalLink,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { FaDiscord, FaYoutube, FaLinkedin } from "react-icons/fa";
import type { Project, ProjectCategory, Track } from "./projects-data";
import { withBasePath } from "./site-paths";

const profile = {
  name: "Ezequiel Gonzalez",
  alias: "Canine Lotus",
  role: "UI/UX Designer • Graphic Designer • Composer",
  email: "contact@example.com",
  location: "Argentina",
  intro:
    "I create memorable game interfaces, visual identities, music, and audiovisual experiences for indie and stylized games.",
  description:
    "Focused on polished interfaces, cohesive art direction, memorable audio, and strong player-facing presentation.",
};

const categories: { id: ProjectCategory; label: string; icon: LucideIcon }[] = [
  { id: "uiux", label: "UI/UX", icon: MonitorCog },
  { id: "art", label: "Art & Design", icon: Palette },
  { id: "music", label: "Music", icon: Music },
  { id: "video", label: "Video Editing", icon: Film },
];

const contactLinks = [
  {
    label: "Discord",
    href: "https://discord.com/users/541829206808461312",
    icon: <FaDiscord size={18} />,
  },
  {
    label: "Linked In",
    href: "https://www.linkedin.com/in/caninelotus",
    icon: <FaLinkedin size={17} />,
  },
  {
    label: "Youtube",
    href: "https://youtube.com/@caninelotus",
    icon: <FaYoutube size={19} />,
  },
  {
    label: "Mail",
    href: "mailto:ezequielgonzalezsipu@gmail.com",
    icon: <Mail size={18} />,
  },
  {
    label: "Newgrounds",
    href: "https://caninelotus.newgrounds.com/",
    icon: (
      <img
        src={withBasePath("/ng_tank.png")}
        alt=""
        className="h-[18px] w-[18px] object-contain"
      />
    ),
  },
];

function isVideoAsset(src?: string | null) {
  if (!src) return false;

  const cleanSrc = src.split("?")[0].toLowerCase();

  return (
    cleanSrc.endsWith(".mp4") ||
    cleanSrc.endsWith(".webm") ||
    cleanSrc.endsWith(".mov")
  );
}

function ProjectMedia({
  src,
  alt,
  className = "",
  controls = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  controls?: boolean;
}) {
  if (!src) {
    return (
      <div className="grid h-full w-full place-items-center text-sm text-zinc-500">
        No media
      </div>
    );
  }

  // Cards use silent looping previews; modal media gets native controls.
  if (isVideoAsset(src)) {
    return (
      <video
        src={src}
        className={className}
        controls={controls}
        autoPlay={!controls}
        muted={!controls}
        loop={!controls}
        playsInline
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

function OSWindow({
  children,
  className = "",
  fixed = false,
}: {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
}) {
  return (
    <div
      className={`${
        fixed ? "fixed" : "relative"
      } border border-fuchsia-400/25 bg-black/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_30px_rgba(217,70,239,0.08)] ${className}`}
    >
      <div className="absolute left-0 right-0 top-0 h-5 border-b border-fuchsia-300/20 bg-gradient-to-b from-pink-500/20 via-fuchsia-500/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-500/[0.2] via-fuchsia-500/[0.1] to-transparent" />

      <div className="pointer-events-none absolute left-2 top-7 h-3 w-3 border-l border-t border-fuchsia-400/100" />
      <div className="pointer-events-none absolute right-2 top-7 h-3 w-3 border-r border-t border-fuchsia-400/100" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-fuchsia-400/100" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-fuchsia-400/100" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ContactButtons({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {contactLinks.map((contact, index) => (
        <a
          key={contact.href}
          href={contact.href}
          target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer"}
          className="flex w-full items-center gap-3 border border-transparent px-4 py-2.5 text-left font-mono text-xs uppercase tracking-widest text-zinc-400 transition hover:border-fuchsia-400/60 hover:bg-fuchsia-400/10 hover:text-fuchsia-300"
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center text-white">
            {contact.icon}
          </span>
          {String(index + 1).padStart(2, "0")}. {contact.label}
        </a>
      ))}
    </div>
  );
}

function Sidebar() {
  return (
    <OSWindow
      fixed
      className="left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-[16.6rem] px-4 pb-4 pt-7 backdrop-blur-xl xl:block"
    >
      <div className="border-b border-fuchsia-400/10">
        <div className="-ml-2 flex items-center gap-2">
          <div className="h-[4.8rem] w-[4rem] shrink-0 overflow-visible">
            <img
              src={withBasePath("/lotus.png")}
              alt="Canine Lotus"
              className="h-full w-full scale-[1] object-contain"
            />
          </div>

          <div className="mt-1 min-w-0">
            <h1 className="whitespace-nowrap text-[1rem] font-black uppercase leading-none tracking-wide text-white">
              {profile.alias}
            </h1>

            <p className="whitespace-nowrap px-0.5 text-[0.78rem] uppercase tracking-[0.1em] text-zinc-500">
              Portfolio
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-5 space-y-2">
        <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-zinc-600">
          Contact Me
        </p>

        <ContactButtons className="space-y-2" />
      </nav>

      <div className="mt-4 border-t border-fuchsia-400/10 pt-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-zinc-600">
          Profile
        </p>

        <div className="mt-3 space-y-3 text-[0.62rem] leading-[1.15]">
          <div>
            <p className="text-zinc-600">Role</p>
            <p className="font-mono uppercase tracking-widest text-zinc-300">
              UI/UX Designer
            </p>
          </div>

          <div>
            <p className="text-zinc-600">Specialty</p>
            <p className="font-mono uppercase tracking-widest text-zinc-300">
              Game Interfaces
              <br />
              Visual Systems
            </p>
          </div>

          <div>
            <p className="text-zinc-600">Location</p>
            <p className="font-mono uppercase tracking-widest text-zinc-300">
              {profile.location}
            </p>
          </div>

          <div>
            <p className="text-zinc-600">Status</p>
            <p className="mt-1 flex items-center gap-2 font-mono uppercase tracking-widest text-fuchsia-400">
              <span className="h-2 w-2 bg-fuchsia-400" />
              Available
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-fuchsia-400/10 pt-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-zinc-600">
          System
        </p>

        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-zinc-400">
          Version 1.0.0
        </p>
      </div>
    </OSWindow>
  );
}

function AudioVisualizer({ audio }: { audio: HTMLAudioElement | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  useEffect(() => {
    if (!audio || analyzerRef.current) return;

    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();

    analyser.fftSize = 128;
    source.connect(analyser);
    analyser.connect(ctx.destination);

    analyzerRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);

    // The canvas is decorative, so it can run independently from React state.
    const draw = () => {
      const canvas = canvasRef.current;
      const analyser = analyzerRef.current;
      const data = dataRef.current;

      if (!canvas || !analyser || !data) {
        requestAnimationFrame(draw);
        return;
      }

      const g = canvas.getContext("2d");
      if (!g) return;

      analyser.getByteFrequencyData(data);
      g.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / data.length;

      data.forEach((value, i) => {
        const h = (value / 255) * canvas.height;
        g.fillStyle = "rgba(232, 121, 249, 0.8)";
        g.fillRect(i * barWidth, canvas.height - h, barWidth - 2, h);
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [audio]);

  return <canvas ref={canvasRef} width={900} height={260} className="w-full" />;
}

function MusicFullscreen({
  track,
  audio,
  playing,
  onPlayPause,
  onClose,
}: {
  track: Track | null;
  audio: HTMLAudioElement | null;
  playing: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}) {
  const [time, setTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = audio;
  }, [audio]);

  useEffect(() => {
    if (!audio) return;

    const update = () => setTime(audio.currentTime);
    audio.addEventListener("timeupdate", update);

    return () => audio.removeEventListener("timeupdate", update);
  }, [audio]);

  const duration = audio?.duration || 0;

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-black/95 p-4 text-white sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 border border-zinc-700 bg-black p-3 sm:right-6 sm:top-6"
          >
            <X />
          </button>

          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-fuchsia-400">
              Now Playing
            </p>

            <h2 className="mt-4 break-words text-center text-3xl font-black uppercase sm:text-5xl">
              {track.name}
            </h2>

            <OSWindow className="mt-8 w-full max-w-5xl px-4 pb-5 pt-7 sm:mt-12 sm:px-8 sm:pb-8 sm:pt-8">
              <AudioVisualizer audio={audio} />
            </OSWindow>
          </div>

          <div className="mx-auto w-full max-w-5xl">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={time}
              onChange={(e) => {
                const audioElement = audioRef.current;
                if (!audioElement) return;

                const nextTime = Number(e.target.value);
                audioElement.currentTime = nextTime;
                setTime(nextTime);
              }}
              className="w-full accent-fuchsia-500"
            />

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={onPlayPause}
                className="border border-fuchsia-400 bg-fuchsia-400/10 px-6 py-3 text-fuchsia-300"
              >
                {playing ? <Pause /> : <Play />}
              </button>

              <p className="font-mono text-sm text-zinc-400">
                {Math.floor(time)} / {Math.floor(duration || 0)} sec
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectCard({
  project,
  onOpen,
  onMusicPlay,
  playingProjectId,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  onMusicPlay: (project: Project, index: number, fullscreen?: boolean) => void;
  playingProjectId: string | null;
}) {
  const cover = project.cover || project.video;

  if (project.category === "music") {
    const hasAudio = project.playlist && project.playlist.length > 0;
    const isPlaying = playingProjectId === project.id;

    return (
      <OSWindow className="relative overflow-hidden px-4 pb-4 pt-7 sm:px-5 sm:pb-5">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 right-0 flex h-24 items-end gap-[3px] px-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`w-full bg-fuchsia-400/70 transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : ""
                }`}
                style={{
                  height: isPlaying
                    ? `${18 + ((i * 23) % 70)}%`
                    : `${8 + ((i * 11) % 24)}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-fuchsia-400">{project.subtitle}</p>

          <h3 className="mt-2 break-words text-xl font-bold text-white sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-zinc-400">
            {project.categoryLabel || project.subtitle}
          </p>

          <div className="mt-5 flex gap-2 sm:gap-3">
            <button
              disabled={!hasAudio}
              onClick={() => onMusicPlay(project, 0, false)}
              className="shrink-0 border border-fuchsia-400 bg-fuchsia-400/10 px-4 py-3 text-fuchsia-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={() => onOpen(project)}
              className="min-w-0 flex-1 border border-zinc-700 bg-black/40 px-4 py-3 font-mono text-xs uppercase tracking-widest text-zinc-300"
            >
              Details
            </button>
          </div>
        </div>
      </OSWindow>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project)}
      className="group text-left"
    >
      <OSWindow className="overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
          <ProjectMedia
            src={cover}
            alt={project.title}
            className="h-full w-full object-contain opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          <h3 className="break-words text-lg font-bold text-white sm:text-xl">
            {project.title}
          </h3>

          <div className="flex items-center justify-between border-t border-zinc-800 pt-4 font-mono text-xs uppercase tracking-widest text-fuchsia-400">
            View Details <ExternalLink size={14} />
          </div>
        </div>
      </OSWindow>
    </motion.button>
  );
}

function MediaGallery({
  mediaItems,
  activeIndex,
  onSelect,
  title,
}: {
  mediaItems: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  title: string;
}) {
  const activeMedia = mediaItems[activeIndex];

  return (
    <div>
      <div className="overflow-hidden border border-fuchsia-400/20 bg-black">
        {activeMedia ? (
          <ProjectMedia
            src={activeMedia}
            alt={title}
            controls
            className="max-h-[72vh] min-h-[14rem] w-full object-contain sm:min-h-0"
          />
        ) : (
          <div className="grid min-h-[14rem] w-full place-items-center text-zinc-500 sm:aspect-video sm:min-h-0">
            No media
          </div>
        )}
      </div>

      {mediaItems.length > 1 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {mediaItems.map((media, index) => (
            <button
              key={`${media}-${index}`}
              onClick={() => onSelect(index)}
              className={`overflow-hidden border ${
                activeIndex === index ? "border-fuchsia-400" : "border-zinc-800"
              }`}
            >
              <ProjectMedia
                src={media}
                alt={`${title} media ${index + 1}`}
                className="aspect-video w-full object-cover opacity-80 hover:opacity-100"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
  onMusicPlay,
}: {
  project: Project | null;
  onClose: () => void;
  onMusicPlay: (project: Project, index: number, fullscreen?: boolean) => void;
}) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (!project) return null;

  const cover = project.cover || project.video;
  const gallery = project.gallery || [];
  const mediaItems = gallery.length > 0 ? gallery : cover ? [cover] : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-2 backdrop-blur-md sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative mx-auto my-2 w-full max-w-6xl sm:my-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
        >
          <OSWindow className="px-3 pb-4 pt-10 sm:px-6 sm:pb-6 sm:pt-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-7 z-20 border border-zinc-700 bg-black/70 p-2 text-zinc-300 sm:right-5 sm:top-8"
            >
              <X size={18} />
            </button>

            {project.category === "video" ? (
              <div className="mx-auto max-w-5xl pt-5">
                <h2 className="pr-12 text-center text-3xl font-black uppercase sm:pr-0 sm:text-5xl">
                  {project.title}
                </h2>

                <div className="mt-5 sm:mt-8">
                  <MediaGallery
                    mediaItems={mediaItems}
                    activeIndex={activeMediaIndex}
                    onSelect={setActiveMediaIndex}
                    title={project.title}
                  />
                </div>

                <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-center leading-7 text-zinc-300 sm:mt-8 sm:leading-8">
                  {project.description}
                </p>
              </div>
            ) : project.category === "music" ? (
              <div className="mx-auto max-w-3xl pt-5">
                <h2 className="pr-12 text-center text-3xl font-black uppercase sm:pr-0 sm:text-5xl">
                  {project.title}
                </h2>

                <p className="mt-5 whitespace-pre-line text-center leading-7 text-zinc-300 sm:mt-6 sm:leading-8">
                  {project.description}
                </p>

                <div className="mt-6 space-y-3 sm:mt-8">
                  {project.playlist?.map((track, index) => (
                    <button
                      key={track.src}
                      onClick={() => onMusicPlay(project, index, true)}
                      className="flex w-full items-center justify-between gap-4 border border-zinc-800 bg-zinc-950 px-4 py-4 text-left hover:border-fuchsia-400/60 sm:px-5"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Play size={16} className="text-fuchsia-400" />
                        <span className="break-words">{track.name}</span>
                      </span>

                      <span className="shrink-0 font-mono text-xs text-zinc-500">
                        Play
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-5 sm:gap-8 lg:grid-cols-[0.9fr_1.4fr]">
                <div className="flex flex-col justify-top">
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-fuchsia-400 lg:mt-16">
                    Project Details
                  </p>

                  <h2 className="break-words text-3xl font-black uppercase leading-none text-white sm:text-4xl">
                    {project.title}
                  </h2>

                  <p className="mt-1 text-lg font-bold text-fuchsia-400 sm:text-xl">
                    {project.subtitle}
                  </p>

                  <p className="mt-2 whitespace-pre-line leading-7 text-zinc-300 sm:leading-8">
                    {project.description}
                  </p>
                </div>

                <MediaGallery
                  mediaItems={mediaItems}
                  activeIndex={activeMediaIndex}
                  onSelect={setActiveMediaIndex}
                  title={project.title}
                />
              </div>
            )}
          </OSWindow>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PortfolioPageClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenTrack, setFullscreenTrack] = useState<Track | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [playingProjectId, setPlayingProjectId] = useState<string | null>(null);

  const projectsByCategory = useMemo(() => {
    return categories.reduce<Record<ProjectCategory, Project[]>>(
      (groupedProjects, category) => ({
        ...groupedProjects,
        [category.id]: initialProjects.filter(
          (project) => project.category === category.id
        ),
      }),
      { uiux: [], art: [], music: [], video: [] }
    );
  }, [initialProjects]);

  // Keep one audio element alive so cards and fullscreen controls stay in sync.
  function playTrack(project: Project, index: number, fullscreen = false) {
    const track = project.playlist?.[index];
    if (!track) return;

    if (audio && playingProjectId === project.id && !fullscreen) {
      audio.pause();
      setPlaying(false);
      setPlayingProjectId(null);
      return;
    }

    if (audio) audio.pause();

    const newAudio = new Audio(track.src);
    newAudio.play();

    setAudio(newAudio);
    setPlaying(true);
    setPlayingProjectId(project.id);

    if (fullscreen) setFullscreenTrack(track);
  }

  function togglePlay() {
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080509] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.22),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <video
        src={withBasePath("/overlay.mp4")}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-[0.055] mix-blend-screen motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <Sidebar />

      <div className="relative z-10 mx-auto w-full px-3 py-3 sm:px-4 xl:ml-[18.6rem] xl:w-auto xl:py-4">
        <OSWindow className="mb-3 px-4 pb-5 pt-7 sm:mb-4 sm:px-6 sm:pb-7 md:px-8 md:pb-8 md:pt-7">
          <div className="grid items-center gap-5 md:gap-8 lg:grid-cols-[0.34fr_1.2fr]">
            <div className="mx-auto flex h-full w-full max-w-xs flex-col justify-center sm:max-w-sm lg:ml-auto">
              <div className="flex w-full items-center justify-center overflow-hidden border border-fuchsia-400/30 bg-zinc-950 p-2">
                <img
                  src={withBasePath("/pfp.png")}
                  alt="Profile"
                  className="aspect-square w-full object-cover object-center"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-fuchsia-400 sm:text-sm sm:tracking-[0.32em]">
                {profile.role}
              </p>

              <h1 className="break-words text-4xl font-black uppercase leading-[0.95] tracking-normal sm:text-5xl md:text-6xl">
                {profile.name}
              </h1>

              <p className="mt-2 text-xl font-bold text-fuchsia-400 sm:text-2xl">
                AKA {profile.alias}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                {profile.intro}
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                {profile.description}
              </p>
            </div>
          </div>
        </OSWindow>

        <OSWindow className="mb-3 px-4 pb-5 pt-7 sm:mb-4 sm:px-6 xl:hidden">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-zinc-600">
            Contact Me
          </p>

          <nav>
            <ContactButtons className="grid gap-2 sm:grid-cols-2" />
          </nav>
        </OSWindow>

        {categories.map((category) => {
          const Icon = category.icon;
          const sectionProjects = projectsByCategory[category.id];

          return (
            <OSWindow
              key={category.id}
              className="mb-3 px-4 pb-6 pt-7 sm:mb-4 sm:px-6 sm:pb-7 md:px-8 md:pb-8 md:pt-7"
            >
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <Icon className="text-fuchsia-400" size={24} />
                <h2 className="text-3xl font-black uppercase sm:text-4xl">
                  {category.label}
                </h2>
              </div>

              {sectionProjects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 md:gap-5 2xl:grid-cols-3">
                  {sectionProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={setSelectedProject}
                      onMusicPlay={playTrack}
                      playingProjectId={playingProjectId}
                    />
                  ))}
                </div>
              ) : (
                <div className="border border-zinc-800 bg-zinc-950 p-5 text-zinc-500 sm:p-8">
                  No projects found in this category.
                </div>
              )}
            </OSWindow>
          );
        })}
      </div>

      {/* Remounting resets the selected media when switching between projects. */}
      <ProjectModal
        key={selectedProject?.id ?? "empty-project"}
        project={selectedProject}
        onClose={() => {
          audio?.pause();
          setPlaying(false);
          setPlayingProjectId(null);
          setFullscreenTrack(null);
          setSelectedProject(null);
        }}
        onMusicPlay={playTrack}
      />

      <MusicFullscreen
        track={fullscreenTrack}
        audio={audio}
        playing={playing}
        onPlayPause={togglePlay}
        onClose={() => {
          audio?.pause();
          setPlaying(false);
          setFullscreenTrack(null);
        }}
      />
    </main>
  );
}
