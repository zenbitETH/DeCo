<template>
  <div class="carousel">
    <carousel :per-page="1" :autoplay="false">
      <slide v-for="(item, index) in items" :key="index">
        <div class="bg-white px-4 py-2 shadow-lg">
          <h3 class="font-bold text-lg">
            {{ item.caption }}
          </h3>
          <p class="text-gray-600">
            {{ item.description }}
          </p>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      items: [
        {
          caption: 'Slide 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt faucibus enim, sed consectetur tortor feugiat vitae.'
        },
        {
          caption: 'Slide 2',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
        },
        {
          caption: 'Slide 3',
          description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          caption: 'Slide 4',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          caption: 'Slide 5',
          description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.'
        }
      ]
    }
  }
}
</script>

  <style>
  .carousel {
    .carousel__slide {
      opacity: 0.8;
      transition: opacity 0.25s ease-in-out;
      &.carousel__slide--active {
        opacity: 1;
      }
    }
  }
  </style>
