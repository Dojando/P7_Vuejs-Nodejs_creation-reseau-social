<template>
  <router-link :to="{ name: 'LireArticle', params: { id: articleId }}">
    <b-card class="article_card" bg-variant="secondary" text-variant="white" :title="titre" border-variant="secondary">
      <b-card-text class="small info_article">Publié par 
        <span v-if="prenom != null && nom != null">{{ prenom+' '+nom }}</span>
        <span v-if="prenom == null && nom == null">[Utilisateur indisponible]</span>
        le {{ date }}</b-card-text>
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
    prenom: {
      type: String,
    },
    nom: {
      type: String,
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