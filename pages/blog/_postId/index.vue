<template>
    <div id="post" v-editable="blok">
        <div class="post-thumbnail" :style="{backgroundImage: 'url(' + image + ')'}">
        </div>
        <section class="post-content">
            <h1>{{ title }}</h1>
            <p>{{ content }}</p>
        </section>
    </div>
</template>

<script>
export default {
    asyncData(context) {
        return context.app.$storyapi.get('cdn/stories/blog/' + context.params.postId, {
            // populated by nuxt that gives access to environment property
            //  First way to determine environment available. This variable can be used everywhere
            version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'
        } ).then(res => {
            console.log(res.data);
            return {
                blok: res.data.story.content,
                image: res.data.story.content.thumbnail,
                title: res.data.story.content.title,
                content: res.data.story.content.content
            }
        }) 
    },
    mounted() {
        // this will initlize our project to be live editable
        this.$storybridge.on(["input", "published", "change"], event => {
        if (event.action === "input") {
            if (event.story.id === this.story.id) {
            this.story.content = event.story.content;
            }
        } else if (!event.slugChanged) {
            window.location.reload();
        }
        });

    }
};
</script>

<style>
    .post-thumbnail {
        width:100%;
        height:300px;
        background-size:cover;
        background-position: center;
    }

    .post-content {
        width:80%;
        max-width: 500px;
        margin: auto;
    }

    .post-content p {
        white-space: pre-line;
    }

</style>