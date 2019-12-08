
<template>
  <div class="card__wrapper">
    <div href="#" class="card__content">
      <router-link :to="{path: link }" class="card__img">
        <img :src=" posterLink " />
      </router-link>
      <div class="card__desc">
        <router-link :to="{path: link }" class="card__title">
          <span class="card__title">{{ movie.title }}</span>
        </router-link>
        <div class="card__line">
          <span class="card__star">&#9733;</span>
          <span class="card__rating">{{ movie.vote_average}}/10</span>
          <span class="card__release">{{ movie.release_date.substring(0, 4) }}</span>
        </div>
        <p class="card__overview">{{ movie.overview }}</p>
        <span class="card__votes">votes: {{ movie.vote_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  props: ["movie"],
  data() {
    return {
      link: "/movie/" + this._props.movie.id,
      posterLink:
        "http://image.tmdb.org/t/p/w200/" + this._props.movie.poster_path
    };
  }
};
</script>

<style scoped>
.card__wrapper {
  margin-bottom: 30px;

  padding: 15px 20px;
}

.card__line {
  margin-bottom: 10px;
}
.card__name {
  text-decoration: none;
  color: black;
}

.card__votes {
  display: flex;
  justify-content: flex-end;
  color: rgba(0, 0, 0, 0.6);
}

.card__star {
  margin-top: -2px;
  margin-right: 4px;
  font-size: 15px;
  color: #ffbf00;
}
.card__rating {
  margin-right: 10px;
  font-size: 14px;
}
.card__release {
  font-size: 14px;
}

.card__content {
  display: flex;
  justify-content: flex-start;
}
.card__img {
  min-width: 100px;
  max-width: 100px;
  margin-right: 20px;
}
.card__img img {
  height: auto;
  width: 100%;
}
.card__title {
  display: flex;
  color: #136cb2;
  text-decoration: none;
  font-size: 22px;
  line-height: 0.9;
  margin-bottom: 3px;
}

.card__overview {
  text-align: left;
  margin-top: 0;
}

span {
  display: flex;
}
.card__line {
  display: flex;
}
</style>

