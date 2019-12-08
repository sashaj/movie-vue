<template>
  <div class="movie__wrapper" v-show="!ishidden">
    <div class="youtube__wrapper">
      <youtube :video-id="videoLink" @ready="ytReady"></youtube>
    </div>
    <div class="movie__info-wrapper">
      <span class="movie__title">{{ movie.title }}</span>
      <div class="movie__line">
        <span class="movie__release_date">Released: {{ date }}</span>
        <div class="movie__rating-wrapper">
          <span class="movie__star">&#9733;</span>
          <span class="movie__rating">{{ movie.vote_average }}/10</span>
        </div>
      </div>
      <div class="movie__genres-wrapper">
        <span class="movie__genre-title">Genres:</span>
        <span v-for="genre in movie.genres" :key="genre.id" class="movie__genres">{{ genre.name }}</span>
      </div>
      <span class="movie__budget">Budget: {{ money }}</span>
      <p class="movie__overview">{{ movie.overview }}</p>
      <span class="movie__votes">Votes: {{ movie.vote_count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "moviePage",
  data() {
    return {
      apiKey: "c26911f7f6f115d919cfcd52f6d717b0",
      loading: true,
      movie: {},
      videoLink: "",
      ishidden: true,
      money: "",
      date: ""
    };
  },

  methods: {
    ytReady() {
      this.ishidden = false;
      this.$loading(false);
    },

    getMovie(id) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US&append_to_response=videos`;
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          this.movie = data;
          return data;
        })
        .catch(error => {
          this.$router.push({ path: "/error" });

          throw new Error(error);
        });
    },
    handleTrailerLink(data) {
      this.moneyFormatter(data.budget);
      this.formatDate(data.release_date);
      const trailer = data.videos.results.filter(function(el) {
        return el.type === "Trailer";
      });
      if (trailer.length > 0) {
        this.videoLink = trailer[0].key;
      } else {
        this.videoLink = data[0].key;
      }
    },
    moneyFormatter(money) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      if (money == 0) {
        this.money = "Unknown";
      } else {
        this.money = formatter.format(money).replace(/\D00$/, "");
      }
      this.loading = false;
    },
    formatDate(d) {
      const date = new Date(d);
      if (isNaN(date.getTime())) {
        return d;
      } else {
        const month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        let day = date.getDate();

        if (day < 10) {
          day = "0" + day;
        }
        this.date =
          day + " " + month[date.getMonth()] + " " + date.getFullYear();
      }
    }
  },
  mounted() {
    this.$loading(true);
    this.getMovie(this.$route.params.id).then(data =>
      this.handleTrailerLink(data)
    );
  }
};
</script>

<style>
.hidden {
  visibility: hidden;
}

html {
  background: url("../assets/textured_stripes.png");
}
.vs__dropdown-menu {
  background-color: rgba(0, 0, 0, 0.8);
}
.vs__dropdown-option {
  color: white;
}
span {
  display: flex;
}
.movie__title {
  font-size: 22px;
  margin-bottom: 5px;
}
.movie__overview {
  text-align: left;
  margin-top: 0;
}
.movie__rating-wrapper {
  display: flex;
}

.movie__rating {
  font-size: 14px;
}
.movie__line {
  display: flex;
  justify-content: space-between;
}

.movie__release_date,
.movie__budget,
.movie__votes,
.movie__genres-wrapper span {
  color: rgb(96, 96, 96);
  font-size: 14px;
}

.movie__genres-wrapper {
  display: flex;
}

.movie__genre-title {
  margin-right: 5px;
}

.movie__genres {
  margin-right: 5px;
  text-transform: lowercase;
}

.movie__genres:after {
  content: ",";
}
.movie__genres:last-child:after {
  content: "";
}
.movie__genres:nth-child(2) {
  text-transform: capitalize;
}
.movie__budget {
  margin-bottom: 10px;
}
.movie__star {
  margin-right: 5px;
  margin-right: 4px;
  font-size: 13px;
  color: #ffbf00;
}
.hidden {
  visibility: hidden;
}

.movie__votes {
  color: rgb(96, 96, 96);
  display: flex;
  justify-content: flex-end;
}
.youtube__wrapper {
  margin-bottom: 10px;
}
iframe {
  width: 100%;
  max-width: 650px;
  max-height: 366px;
}
</style>

