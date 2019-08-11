<template>
  <section id="posts">
    <PostPreview 
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailImage="post.thumbnailUrl"
      :id="post.id"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Blog/PostPreview";

export default {
  components: {
    PostPreview
  },

  // Fetch and populates data of our component both on the server and the client
  asyncData(context) {
    return context.app.$storyapi
    .get("cdn/stories", {
        // Second way to determine environment available. Context is only availble is async data when we get the context
      version: context.isDev ? "draft" : "publsihed",
      starts_with: 'blog/'
    })
    .then(res => {
      console.log(res);
      return { 
        posts: res.data.stories.map(bp => {
          return {
            id: bp.slug,
            title: bp.content.title ,
            previewText: bp.content.summary,
            thumbnailUrl: bp.content.thumbnail
          };
        })
      };
    })
  }


  // data() {
  //   return {
  //     posts : [
  //       { 
  //         title: "A New Beginning",
  //         previewText: "This will be awesome, don\t miss it!",
  //         thumbnailUrl: "https://www.agency73.com/wp-content/uploads/2018/10/agenda-concept-development.jpeg",
  //         id: "a-new-beginning"
  //       },
  //       { 
  //         title: "A Second Beginning",
  //         previewText: "This will be awesome, don\t miss it!",
  //         thumbnailUrl: "https://www.agency73.com/wp-content/uploads/2018/10/agenda-concept-development.jpeg",
  //         id: "a-second-beginning"
  //       },        

  //     ]
  //   }
  // }
}
</script>

<style scoped>
#posts {
  padding-top:2rem;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media(min-width: 35rem) {
  #posts {
    flex-direction:row;
  }
}

</style>