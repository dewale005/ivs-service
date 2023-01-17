/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from "react";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import * as config from "../../config";

// Styles
import "./Quiz.css";

function Quiz() {
  useEffect(() => {
    const MediaPlayerPackage = window.IVSPlayer;

    // First, check if the browser supports the Amazon IVS player.
    if (!MediaPlayerPackage.isPlayerSupported) {
      console.warn(
        "The current browser does not support the Amazon IVS player."
      );
      return;
    }

    const playbackUrl =
      "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8";
    const videoPlayer = document.getElementById("video-player");
    const quizEl = document.getElementById("quiz");
    const waitMessage = document.getElementById("waiting");
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const cardInnerEl = document.getElementById("card-inner");

    (function (IVSPlayer) {
      const PlayerState = IVSPlayer.PlayerState;
      const PlayerEventType = IVSPlayer.PlayerEventType;

      // Initialize player
      const player = IVSPlayer.create();
      player.attachHTMLVideoElement(videoPlayer);

      // Attach event listeners
      player.addEventListener(PlayerState.PLAYING, function () {
        console.log("Player State - PLAYING");
      });
      player.addEventListener(PlayerState.ENDED, function () {
        console.log("Player State - ENDED");
      });
      player.addEventListener(PlayerState.READY, function () {
        console.log("Player State - READY");
      });
      player.addEventListener(PlayerEventType.ERROR, function (err) {
        console.warn("Player Event - ERROR:", err);
      });

      player.addEventListener(
        PlayerEventType.TEXT_METADATA_CUE,
        function (cue) {
          const metadataText = cue.text;
          const position = player.getPosition().toFixed(2);
          console.log(
            `PlayerEvent - METADATA: "${metadataText}". Observed ${position}s after playback started.`
          );
          triggerQuiz(metadataText);
        }
      );

      // Setup stream and play
      player.setAutoplay(true);
      player.load(playbackUrl);

      // Setvolume
      player.setVolume(0.1);

      // Remove card
      function removeCard() {
        quizEl.classList.toggle("drop");
      }

      // Trigger quiz
      function triggerQuiz(metadataText) {
        let obj = JSON.parse(metadataText);

        quizEl.style.display = "";
        quizEl.classList.remove("drop");
        waitMessage.style.display = "none";
        cardInnerEl.style.display = "none";
        cardInnerEl.style.pointerEvents = "auto";

        while (answersEl.firstChild)
          answersEl.removeChild(answersEl.firstChild);
        questionEl.textContent = obj.question;

        let createAnswers = function (obj, i) {
          let q = document.createElement("a");
          let qText = document.createTextNode(obj.answers[i]);
          answersEl.appendChild(q);
          q.classList.add("answer");
          q.appendChild(qText);

          q.addEventListener("click", (event) => {
            cardInnerEl.style.pointerEvents = "none";
            if (q.textContent === obj.answers[obj.correctIndex]) {
              q.classList.toggle("correct");
            } else {
              q.classList.toggle("wrong");
            }
            setTimeout(function () {
              removeCard();
              waitMessage.style.display = "";
            }, 1050);
            return false;
          });
        };

        for (var i = 0; i < obj.answers.length; i++) {
          createAnswers(obj, i);
        }
        cardInnerEl.style.display = "";
      }

      waitMessage.style.display = "";
    })(window.IVSPlayer);
  }, []);
  return (
    <>
      <header>
        <h1>IVS Quiz Web Demo</h1>
      </header>
      <div className="main full-width full-height chat-container">
        <div className="content-wrapper mg-2">
          <VideoPlayer playbackUrl={config.PLAYBACK_URL} />
          <div className="col-wrapper">
            <div className="quiz-wrap">
              <div id="waiting">
                <span className="waiting-text float">
                  Waiting for the next question
                </span>
              </div>
              <div id="quiz" className="card drop">
                <div id="card-inner">
                  <h2 id="question"></h2>
                  <div id="answers"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
