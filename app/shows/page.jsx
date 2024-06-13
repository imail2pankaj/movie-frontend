"use client"
import SwipeCardClass from '@/lib/SwipeCardClass';
import React, { useEffect, useRef } from 'react'
// import { TinderSwipe } from './_components/TinderSwipe'

const Movies = () => {
  const swiper = useRef(null);
  const like = useRef(null);
  const dislike = useRef(null);
  // const swiper = document.querySelector('#swiper');
  // const like = document.querySelector('#like');
  // const dislike = document.querySelector('#dislike');

  // constants
  const urls = [
    'https://i.pravatar.cc/300',
    'https://i.pravatar.cc/300',
    'https://i.pravatar.cc/300',
    'https://i.pravatar.cc/300',
    'https://i.pravatar.cc/300'
  ];

  // variables
  let cardCount = 0;

  // functions
  function appendNewCard() {
    const card = new SwipeCardClass({
      imageUrl: urls[cardCount % 5],
      onDismiss: appendNewCard,
      onLike: () => {
        like.current.style.animationPlayState = 'running';
        like.current.classList.toggle('trigger');
      },
      onDislike: () => {
        dislike.current.style.animationPlayState = 'running';
        dislike.current.classList.toggle('trigger');
      }
    });

    swiper.current.append(card.element);
    cardCount++;

    const cards = swiper.current.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
      card.style.setProperty('--i', index);
    });
  }

  // first 5 cards
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      appendNewCard();
    }
  }, []);

  return (
    <div className='container'>
      {/* <TinderSwipe /> */}
      <div id="dislike" name="heart-dislike" ref={dislike}></div>
      <div id="swiper" ref={swiper}></div>
      <div id="like" name="heart" ref={like}></div>
    </div>
  )
}

export default Movies