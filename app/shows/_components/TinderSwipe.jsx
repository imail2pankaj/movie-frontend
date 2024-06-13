"use client"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";

const style = {
  backgroundImage: "url(https://img.icons8.com/color/452/GeeksforGeeks.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundColor: "#55ccff",
  boxShadow: "5px 10px 18px #888888",
  borderRadius: 10,
  height: 300,
};

export const TinderSwipe = () => {
  const motionValue = useMotionValue(0);

  const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);

  const opacityValue = useTransform(
    motionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  const animControls = useAnimation();

  return (
    <motion.div
      center
      // Card can be drag only on x-axis 
      drag='x'
      x={motionValue}
      rotate={rotateValue}
      opacity={opacityValue}
      dragConstraints={{ left: -1000, right: 1000 }}
      style={style}
      onDragEnd={(event, info) => {

        // If the card is dragged only upto 150 on x-axis 
        // bring it back to initial position 
        if (Math.abs(info.point.x) <= 150) {
          animControls.start({ x: 0 });
        } else {

          // If card is dragged beyond 150 
          // make it disappear 

          // Making use of ternary operator 
          animControls.start({ x: info.point.x < 0 ? -200 : 200 });
        }
      }}
    >
      {/* Your card content */}
    </motion.div>
  );
};

// export default TinderSwipe;
