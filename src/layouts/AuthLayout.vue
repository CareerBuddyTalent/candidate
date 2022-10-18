<template>
  <main class="lg:flex lg:h-screen">
    <div class="basis-1/2 bg-[#FDEDF3] px-20 hidden lg:block pt-11">
      <img src="@/assets/images/tamborin.png" alt="logo" class="object-cover h-6 mb-36" />
      <img src="@/assets/icons/auth.svg" alt="logo" class="object-cover mb-36" />
      <div>
        <p class="font-cooper text-4xl font-light text-brand-black">Get in the Spotlight!</p>
        <p class="text-xl text-brand-black/40 font-normal">It’s simple, let us connect you to the best employers. For free!</p>
      </div>
    </div>
    <div class="basis-1/2 grow">
      <router-view />
    </div>
  </main>
</template>
