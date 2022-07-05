<script>
  import { onMount } from "svelte";
  import authorsFile from "./assets/authors.json";
  import postsFile from "./assets/posts.json";
  
  let authorsData;
  let postsData;
  let userTZ;
  export let cardsData = [];
  const authorsAPI = "http://maqe.github.io/json/authors.json";
  const postsAPI = "http://maqe.github.io/json/posts.json";

  onMount(async () => {
    await fetchAPI();
    userTZ = getCurrentTZ();
  });

  function getCurrentTZ() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // Format datetime to 'Saturday, May 9, 2020, 00:01'
  function formatDateTime(dateTime) {
    const d = new Date(dateTime);
    const date = d.getDate();
    const year = d.getFullYear();
    const hour = ("0" + d.getHours()).slice(-2);
    const minute = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    const day = d.toLocaleString("en-us", { weekday: "long" });
    const month = d.toLocaleString("en-us", { month: "long" });

    return `${day}, ${month} ${date}, ${year}, ${hour}:${minute}`;
  }

  async function fetchAPI() {
    authorsData = await fetch(authorsAPI).then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        console.error(`Could not fetch ${authorsAPI}`);
        console.warn(`Getting data from cache.`);
        return authorsFile;
      }
    });
    postsData = await fetch(postsAPI).then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        console.error(`Could not fetch ${postsAPI}`);
        console.warn(`Getting data from cache.`);
        return postsFile;
      }
    });

    // console.log("authorsData :>> ", authorsData);
    // console.log("postsData :>> ", postsData);

    cardsData = postsData
      .map((post) => {
        const author = authorsData.find(
          (author) => author.id === post.author_id
        );
        post.posted_on = formatDateTime(post.created_at);
        return {
          ...post,
          author,
        };
      })
      .sort((a, b) => b.created_at - a.created_at);

    console.log("cardsData :>> ", cardsData);
  }
</script>

<main>
  <div class="container mx-40 my-10">
    <h1 class="text-3xl font-bold">MAQE Forum</h1>
    <p class="text-md mt-7">
      Your current time is: <span id="timezone" />
      {userTZ}
    </p>
    <div class="container mx-auto mt-4">
      {#each cardsData as card}
        <div class="my-5 {card.id % 2 != 0 ? "bg-white" : "bg-customBg1"} shadow-md divide-y divide-solid" id="card">
          <div
            class="flex flex-row justify-left items-center pl-5 p-2"
            id="card-header"
          >
            <div>
              <img
                class="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                src={card.author.avatar_url}
                alt=""
              />
            </div>
            <div class="pl-2 text-sm text-orange-600">
              <p id="author-name">{card.author.name}</p>
            </div>
            <div class="text-sm pl-1 text-gray-400">
              <p>
                <span>
                  posted on
                  <span id="post-date">{card.posted_on}</span>
                </span>
              </p>
            </div>
          </div>
          <div id="card-body" class="flex flex-row">
            <img
              class="pt-5 pl-5 pb-5 inline-block h-auto w-auto"
              src="{card.image_url}"
              alt=""
            />
            <div class="flex-1 pt-7 pl-5 pr-4 pb-4">
              <div id="post-title-div">
                <p class="text-2xl font-bold" id="post-title">
                  {card.title}
                </p>
              </div>
              <div class="pt-3" id="post-content-div">
                <p class="text-md" id="post-content">
                  {card.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
</style>
