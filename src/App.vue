<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-if="ready" v-mutate="mutationHandler">
      <SystemBar />
      <MainNavBar :page.sync="page" />

      <v-row width="100%" justify="center">
        <section id="top" class="section">
          <div class="base-title">
            <a href="#top" class="core-goto"></a>
            <Top :page.sync="page" />
          </div>
        </section>

      </v-row>

      <!-- ============================= LIST ============================= -->
      <v-row width="100%" justify="center">
        <section id="list" class="section">
          <div class="base-title">
            <a href="#list" class="core-goto"></a>
            <List :page.sync="page" />
          </div>
        </section>
      </v-row>
      <!-- ============================= CREEN SECTION ============================= -->
      <v-row width="100%" justify="center">
        <section id="dgtek" class="section">
          <div class="base-title">
            <a href="#dgtek" class="core-goto"></a>
            <GreenSection />
          </div>
        </section>
      </v-row>
      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row width="100%" justify="center">
        <section id="how-to-connect" class="section">
          <div class="base-title">
            <a href="#how-to-connect" class="core-goto"></a>
            <HowToConnect :page.sync="page" />
          </div>
        </section>
      </v-row>
      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%" justify="center">
        <section id="testimonials" class="section">
          <div class="base-title">
            <a href="#testimonials" class="core-goto"></a>
            <Testimonials :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= INTERNET PLANS ============================= -->
      <v-row width="100%" justify="center">
        <section id="plans" class="section">
          <div class="base-title">
            <a href="#plans" class="core-goto"></a>
            <InternetPlans :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= FAQ ============================= -->
      <v-row width="100%" justify="center">
        <section id="faq" class="section">
          <div class="base-title">
            <a href="#faq" class="core-goto"></a>
            <FAQ :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= FOOTER ============================= -->
      <section id="footer" width="100%" class="homefone">
        <div class="base-title">
          <a href="#footer" class="core-goto"></a>
            <v-row width="100%">
              <Footer :emailEndpoint="mailEndpoint" v-mutate="footerMutationHandler" />
            </v-row>
        </div>
      </section>
    </v-container>
  </v-app>
</template>

<style>
  .section {
    width: 100%;
    max-width: 1440px;
  }
  body {
    overflow: hidden;
  }
</style>

<script>

import { mapState, mapActions } from 'vuex'

import 'pineapple-styles'

/* SystemBar */
import 'pineapple-system-bar'
import 'pineapple-system-bar/dist/pineapple-system-bar.css'

/* MainNavBar */
import 'pineapple-main-nav-bar'
import 'pineapple-main-nav-bar/dist/pineapple-main-nav-bar.css'

/* HowToConnect */
import 'pineapple-how-to-connect'
import 'pineapple-how-to-connect/dist/pineapple-how-to-connect.css'

/* Testimonials */
import 'pineapple-testimonials'
import 'pineapple-testimonials/dist/pineapple-testimonials.css'

/* InternetPlans */
import 'pineapple-internet-plans'
import 'pineapple-internet-plans/dist/pineapple-internet-plans.css'

/* Popup */
import 'pineapple-popup'
import 'pineapple-popup/dist/pineapple-popup.css'

/* FAQ */
import 'pineapple-faq'
import 'pineapple-faq/dist/pineapple-faq.css'

/* Footer */
import 'pineapple-footer'
import 'pineapple-footer/dist/pineapple-footer.css'

import Top from '@/components/Top.vue'
import List from '@/components/List.vue'
import GreenSection from '@/components/GreenSection.vue'

export default {
  name: 'App',
  components: {
    Top,
    List,
    GreenSection
  },
  data () {
    return {
      ready: false,
      page: null,
      user: {
        name: '',
        email: '',
        phone: ''
      },
      plans: false
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint', 'emailSubject', 'emailText', 'mainContentHeight', 'footerHeight']),
    ...mapState('content', ['userForm', 'top'])
  },
  watch: {
    page (val) {
      if (!val) return
      this.$vuetify.goTo(val, {
        duration: 500,
        offset: 20,
        easing: 'easeInOutCubic'
      })
      this.page = undefined
    }
  },
  methods: {
    ...mapActions({
      getGeneralInfo: 'GET_GENERAL_INFO'
    }),
    ...mapActions('content', {
      getPageContent: 'GET_PAGE_CONTENT'
    }),
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    },
    mutationHandler (mutations) {
      this.$store.commit('UPDATE_MAIN_CONTENT_HEIGHT', this.$el.offsetHeight)
      document.body.style.height = this.mainContentHeight + this.footerHeight - 36 + 'px'
    },
    footerMutationHandler (mutations) {
      const footer = document.querySelector('.footer')
      this.$store.commit('UPDATE_FOOTER_HEIGHT', footer.offsetHeight)
      document.body.style.height = this.mainContentHeight + this.footerHeight - 36 + 'px'
    }
  },
  beforeMount () {
    this.getGeneralInfo()
    this.getPageContent(3)
      .then((response) => {
        document.title = response
        this.ready = true
      })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
