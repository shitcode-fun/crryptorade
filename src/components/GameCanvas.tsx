"use client";

import React, { useRef, useEffect, useState } from 'react';

interface GameCanvasProps {
  width?: number;
  height?: number;
  onGameOver: (score: number, coins: number) => void;
  onTriggerTrivia: () => void;
}

export function GameCanvas({
  width = 400,
  height = 600,
  onGameOver,
  onTriggerTrivia,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carX, setCarX] = useState(width / 2 - 15);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const obstaclesRef = useRef<{ x: number; y: number }[]>([]);
  const coinsRef = useRef<{ x: number; y: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [pause, setPause] = useState(false);
  const keys = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const lastTimeRef = useRef(0);
  const triviaTimerRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.current.left = true;
      if (e.key === 'ArrowRight') keys.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.current.left = false;
      if (e.key === 'ArrowRight') keys.current.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    let animationFrameId: number;
    let spawnTimer = 0;
    const spawnInterval = 1000;

    const render = (time: number) => {
      if (!canvasRef.current || !ctx) return;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pause && !gameOver) {
        let newX = carX;
        if (keys.current.left) newX -= 4;
        if (keys.current.right) newX += 4;
        newX = Math.max(0, Math.min(newX, width - 30));
        setCarX(newX);

        spawnTimer += delta;
        if (spawnTimer > spawnInterval) {
          spawnTimer = 0;
          obstaclesRef.current = [
            ...obstaclesRef.current,
            { x: Math.random() * (width - 20), y: 0 },
          ];
          if (Math.random() < 0.5) {
            coinsRef.current = [
              ...coinsRef.current,
              { x: Math.random() * (width - 10), y: 0 },
            ];
          }
        }

        obstaclesRef.current = obstaclesRef.current
          .map((o) => ({ x: o.x, y: o.y + delta * 0.2 }))
          .filter((o) => {
            if (o.y + 20 >= height - 20 && o.x < carX + 30 && o.x + 20 > carX) {
              setHealth((h) => h - 1);
              return false;
            }
            return o.y < height;
          });

        coinsRef.current = coinsRef.current
          .map((c) => ({ x: c.x, y: c.y + delta * 0.2 }))
          .filter((c) => {
            if (c.y + 10 >= height - 20 && c.x < carX + 30 && c.x + 10 > carX) {
              setCoins((co) => co + 1);
              setScore((s) => s + 10);
              return false;
            }
            return c.y < height;
          });

        setScore((s) => s + delta * 0.01);

        triviaTimerRef.current += delta;
        if (triviaTimerRef.current > 15000) {
          triviaTimerRef.current = 0;
          setPause(true);
          onTriggerTrivia();
        }

        if (health <= 0) {
          setGameOver(true);
          onGameOver(Math.floor(score), coins);
        }
      }

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'blue';
      ctx.fillRect(carX, height - 20, 30, 20);

      ctx.fillStyle = 'red';
      obstaclesRef.current.forEach((o) => ctx.fillRect(o.x, o.y, 20, 20));

      ctx.fillStyle = 'yellow';
      coinsRef.current.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x + 5, c.y + 5, 5, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.fillStyle = 'white';
      ctx.fillText(`Health: ${health}`, 10, 20);
      ctx.fillText(`Score: ${Math.floor(score)}`, 10, 40);
      ctx.fillText(`Coins: ${coins}`, 10, 60);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [carX, width, height, pause, gameOver, health, score, coins, onTriggerTrivia, onGameOver]);

  useEffect(() => {
    const handleTriviaResolved = (e: Event) => {
      const detail = (e as CustomEvent<{ correct: boolean }>).detail;
      if (detail.correct) {
        setHealth((h) => Math.min(h + 1, 3));
      }
      setPause(false);
    };
    window.addEventListener('triviaResolved', handleTriviaResolved as EventListener);
    return () => window.removeEventListener('triviaResolved', handleTriviaResolved as EventListener);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      role="img"
      aria-label="Game canvas showing your car, obstacles, and coins"
      className="border bg-gray-800 max-w-full h-auto"
    />
  );
}