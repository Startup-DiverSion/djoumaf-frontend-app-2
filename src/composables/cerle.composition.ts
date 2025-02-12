import { reactive, ref, onMounted } from 'vue'
import { AuthService } from '@/services/auth.services'
import { useRouter, useRoute } from 'vue-router'
import { LocalSotreUtils } from '@/vendors/utils/localStore.utils'
import { CryptUtils } from '@/vendors/utils/crypt.utils'
import axios from 'axios'
import { Device } from '@capacitor/device'
import { UserService } from './../services/user.services'
import { defineAsyncComponent } from 'vue'
import { URL } from '@/router/url'
import { useUserComposition } from './user.composition'
import { useNotificationComposition } from './notification.composition'

export const useCerleComposition = () => {
  const isFollowUser = ref(false)
  const { USER, GET_USER } = useUserComposition()
  const { SendNotification } = useNotificationComposition()

  const statistic = reactive([
    {
      name: 'Abonné(s)',
      count: 0,
      link: '/my-cercle/?r=Abonner',
      actived: false,
    },
    {
      name: 'Abonnement(s)',
      count: 0,
      link: '/my-cercle/?r=Abonnements',
      actived: false,
    },
    // {
    //   name: "Djoumé(s)",
    //   count: 0,
    //   link: '?content_page=followerdjoumer',
    //   actived:  false
    // },
    // {
    //   name: "Partenaire(s)",
    //   count: 0,
    //   link: 'content_page=followerpartenaire',
    //   actived:  false
    // },
    // {
    //   name: "Entreprises",
    //   count: 0,
    //   link: '?content_page=followercompany',
    //   actived:  false
    // },
  ])

  onMounted(() => {
    GET_USER()
  })

  const abonneCount = ref(0)
  const abonnementCount = ref(0)
  const FOLLOWCount = async (id: any) => {
    try {
      const { data } = await axios.post(URL.CERCLE_FOLLOW_COUNT_USER, { id })
      if (data) {
        abonneCount.value = data.abonner
        abonnementCount.value = data.abonnement
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loading__follow = ref(false)
  const FOLLOW = async (id: any, datas: any) => {
    try {
      const { data } = await axios.post(URL.CERCLE_FOLLOW_USER, { id })

      loading__follow.value = true

      const notificationDATA: any = {
        recevie_id: datas.user.id,
        content: 'Voir le profil',
        redirect: `/`,
        provide_id: USER.value.id,
      }

      if (data) {
        loading__follow.value = false
        if (data.data == 'Remove') {
          datas.user.isProfileFollow = false
          isFollowUser.value = false
          notificationDATA.type = 240
          SendNotification(notificationDATA)
        } else {
          ISFOLLOW(id)
          datas.user.isProfileFollow = true
          notificationDATA.type = 239
          SendNotification(notificationDATA)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ISFOLLOW = async (id: any) => {
    try {
      const { data } = await axios.post(URL.CERCLE_IS_FOLLOW_USER, {
        userHadFollowID: id,
      })

      console.log(data?.data?.users[0].id == id)

      if (data?.data?.users[0].id == id) {
        isFollowUser.value = true
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getMyCercleAbonnement = ref()
  const getMyCercleAbonner: any = ref([])
  const error_getMyCercle = ref(false)
  const loading_getMyCercle = ref(false)

  const MYCERCLE = async () => {
    loading_getMyCercle.value = true
    try {
      const { data } = await axios.get(URL.CERCLE_LIST)
      if (data) {
        // Abonnements
        statistic[1].count = data.getMyCercleAbonnement.length
        getMyCercleAbonnement.value = data.getMyCercleAbonnement.reverse()

        data.getMyCercleAbonner.forEach((ab: any) => {
          getMyCercleAbonner.value.push(ab.profile)
        })

        // Abonner
        statistic[0].count = data.getMyCercleAbonner.length
        getMyCercleAbonner.value = getMyCercleAbonner.value.reverse()
        loading_getMyCercle.value = false
      }
    } catch (error) {
      error_getMyCercle.value = true
      console.log(error)
    }
  }

  const state_profile = reactive({
    profile: [],
    count: 0,
    totalCount: 0,
    loading: false,
    loading_paginied: false,
    error: false,
    cache: [],
    is_paginted: false,

    paginted: {
      limit: 20,
      current: 20,
      page: 1,
    },
  })

  const ALLPROFILE = async (query: any) => {
    try {
      state_profile.loading = state_profile.is_paginted == true ? false : true
      state_profile.loading_paginied = true
      const { data } = await axios.post(`${URL.CERCLE_ALL_PROFILE}`, {
        limit: query?.limit,
        page: query?.page,
        search: query?.search,
      })
      if (data) {
        // Count all profile
        state_profile.count = data.count
        state_profile.totalCount = data.count_total_profile

        // Get profile data
        state_profile.profile = data.getAllProfile
        state_profile.profile.forEach((pro) => {
          state_profile.cache?.push(pro)
        })

        // Loadinf if data exist
        state_profile.loading = false
        state_profile.loading_paginied = false
      }
    } catch (error) {
      state_profile.error = false
      state_profile.loading_paginied = false
      console.log(error)
    }
  }

  const state_profile_compagny = reactive({
    profile: [],
    count: 0,
    totalCount: 0,
    loading: false,
    loading_paginied: false,
    error: false,
    cache: [],
    is_paginted: false,

    paginted: {
      limit: 20,
      current: 20,
      page: 1,
    },
  })
  const ALLPROFILE_COMPANY = async (query: any) => {
    try {
      state_profile_compagny.loading = state_profile_compagny.is_paginted == true ? false : true
      state_profile_compagny.loading_paginied = true
      const { data } = await axios.post(`${URL.CERCLE_ALL_PROFILE_COMPAGNY}`, {
        limit: query?.limit,
        page: query?.page,
        search: query?.search,
      })
      if (data) {
        // Count all profile
        state_profile_compagny.count = data.count
        state_profile_compagny.totalCount = data.count_total_profile

        // Get profile data
        state_profile_compagny.profile = data.getAllProfileCompany
        state_profile_compagny.profile.forEach((pro) => {
          state_profile_compagny.cache?.push(pro)
        })

        // Loadinf if data exist
        state_profile_compagny.loading = false
        state_profile_compagny.loading_paginied = false
      }
    } catch (error) {
      state_profile_compagny.loading_paginied = false
      state_profile_compagny.error = false
      console.log(error)
    }
  }

  const __MAIN_MoreSee = (_p: any, ToPagined: any, data: any) => {
    _p.is_paginted = true
    _p.paginted.page++
    ToPagined({ limit: _p.paginted.limit, page: _p.paginted.page })
      .then(() => {
        _p.paginted.current = _p.paginted.current + _p.count
        _p[data] = _p.cache
      })
      .catch(() => {
        _p.paginted.page--
      })
  }

  const MoreSeeProfile = () => {
    __MAIN_MoreSee(state_profile, ALLPROFILE, 'profile')
  }

  const MoreSeeProfileCompagny = () => {
    __MAIN_MoreSee(state_profile_compagny, ALLPROFILE_COMPANY, 'profile')
  }

  return {
    FOLLOW,
    ISFOLLOW,
    isFollowUser,
    MYCERCLE,
    getMyCercleAbonnement,
    getMyCercleAbonner,
    error_getMyCercle,
    loading_getMyCercle,
    ALLPROFILE,
    ALLPROFILE_COMPANY,
    statistic,
    FOLLOWCount,
    abonneCount,
    abonnementCount,
    state_profile,
    state_profile_compagny,
    MoreSeeProfile,
    MoreSeeProfileCompagny,
    __MAIN_MoreSee,
    loading__follow,
  }
}
