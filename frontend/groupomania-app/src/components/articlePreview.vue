<template>
  <router-link :to="{ name: 'LireArticle', params: { id: articleId }}">
    <b-card class="article_card" bg-variant="secondary" text-variant="white" :title="titre" border-variant="secondary">
      <b-card-text class="small info_article">Publié par {{ auteur }} le {{ date }}</b-card-text>
    </b-card>
  </router-link>
</template>

<script>
export default {
  name: "ArticlePreview",
  props: {
    titre: {
      type: String,
    },
    auteur: {
      type: String,
      default: "Utilisateur introuvable"
    },
    date: {
      type: String,
    },
    articleId: {
      type: Number,
    }
  }
}
</script>