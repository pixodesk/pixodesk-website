---
title: Lottie React
---




# Add Lottie Animation to React App

You can add Lottie animations to a React app very easily. The most common and recommended way is to use the lottie-react package.

This is clean, modern way step by step.

---

## Create React project

Open terminal and go to the folder where you want your project:

```bash
cd path/to/your/projects
```
Then:

```bash
npm create vite@latest my-lottie-app -- --template react-ts
```

This creates a React + TypeScript project called my-lottie-app

Now go into it:
```bash
cd my-lottie-app
```
Install dependencies:

```bash
npm install
```

Start dev server:
```bash
npm run dev
```

You should see:
```bash
Local: http://localhost:5173
```

---

## Install Lottie for React

In your React project folder, run:

```bash
npm install lottie-react
```
or
```bash
yarn add lottie-react
```

---

## Make or get a Lottie animation file

- Make .json animation in 2D-animator

    <pre><a href="https://pixodesk.com/2d-animator" target="blank">https://pixodesk.com/2d-animator</a></pre>

- or download from:

    <pre><a href="https://lottiefiles.com" target="blank">https://lottiefiles.com</a></pre>


Create folder:

```bash
src/assets
```

Put your animation file there, for example:

```bash
src/assets/animation.json
```

---

## Use Lottie in your React component

```tsx

import Lottie from "lottie-react";
import animationData from "../assets/animation.json";


function App() {
    return (
        <div style={{ width: 300, height: 300 }}>
            <Lottie 
                animationData={animationData}
                loop={true}
                autoplay={true}
            />
        </div>
    );
}

export default App;

```

---

Or

## Create Lottie component

Create file:

```bash
src/components/HeroAnimation.tsx
```
Add:

```tsx
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";

function HeroAnimation() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export default HeroAnimation;
```


---


## Use it in App.tsx

Edit **src/App.tsx:**



```tsx
import HeroAnimation from "./components/HeroAnimation";

function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>My Lottie Demo</h1>
      <HeroAnimation />
    </div>
  );
}

export default App;

```

Save → browser updates → animation appears


---

## Final structure 
```bash
my-lottie-app/
  src/
    assets/
      animation.json
    components/
      HeroAnimation.tsx
    App.tsx
    main.tsx

```

---

## With Tailwind (nice for portfolio)

```astro
<div className="w-64 h-64 mx-auto hover:scale-105 transition-transform">
    <Lottie animationData={animationData} />
</div>
```
This gives you a smooth hover effect + animation.


