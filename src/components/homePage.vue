<template>
  <div>
    <div class="container">
      <vSelect
        :options="genresArray"
        :filterable="false"
        label="name"
        :searchable="false"
        v-model="currentGenre"
      />
    </div>
    <movieList v-if="!this.loading" :movieList="movieList" :currentGenre="currentGenre" />
  </div>
</template>

<script>
import movieList from "./movieList.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "homePage",
  components: {
    movieList,
    vSelect
    // search
  },
  data() {
    return {
      loading: true,
      movieList: {},
      currentGenre: "Music",
      apiKey: "c26911f7f6f115d919cfcd52f6d717b0",
      genres: {},
      genresArray: []
    };
  },
  methods: {
    getGenresList() {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
      return fetch(url)
        .then(response => response.json())
        .then(data => (this.genres = data))
        .catch(error => {
          this.$router.push({ path: "/error" });
          throw new Error(error);
        });
    },
    saveGenres(arr) {
      for (let i in arr.genres) {
        this.genresArray.push(arr.genres[i].name);
      }
      return new Promise(resolve => {
        resolve(arr);
      });
    },
    searchGenre(arr, genreName) {
      this.loading = true;
      this.$loading(true);

      return new Promise(resolve => {
        resolve(
          arr.genres.find(obj => {
            return obj.name === genreName;
          })
        );
      });
    },
    getMovies(obj) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${obj.id}`;
      return fetch(url)
        .then(response => response.json())
        .catch(error => {
          this.$router.push({ path: "/error" });
          throw new Error(error);
        });
    },
    saveMovies(data, genreName) {
      this.movieList[genreName] = data.results;
      this.loading = false;
      this.$loading(false);
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },

  mounted() {
    this.getGenresList()
      .then(genres => this.saveGenres(genres))
      .then(arr => this.searchGenre(arr, this.capitalize(this.currentGenre)))
      .then(obj => this.getMovies(obj))
      .then(data => this.saveMovies(data, this.currentGenre));
  },

  watch: {
    currentGenre: function() {
      //check if genre was downloaded before
      if (!this.movieList.hasOwnProperty(this.currentGenre)) {
        this.searchGenre(this.genres, this.capitalize(this.currentGenre))
          .then(obj => this.getMovies(obj))
          .then(data => this.saveMovies(data, this.currentGenre));
      }
    }
  }
};
</script>

<style>
.v-select {
  width: 200px;
  margin-left: auto;
  margin-bottom: 50px;
}
.vs__clear {
  display: none;
}
</style>


