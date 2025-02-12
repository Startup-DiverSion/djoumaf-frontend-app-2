import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { JobService } from '@/services/job.services'
import { useJobStore } from './../../../stores/jobs'
import moment from 'moment'
import axios from 'axios'
import { useModal } from '@/components/modals/modal.services'
import { useToastStore } from './../../../stores/toast'
import { createToast, withProps } from 'mosha-vue-toastify'
import ToastIndex from '@/toastifications/toast.index.vue'
import { NotifUtils } from '@/vendors/utils/notif.utils'
import { useCerleComposition } from '@/composables/cerle.composition'

// by convention, composable function names start with "use"
export function useJobComposition() {
  const isError: any = ref({ message: '', path: '' })
  const datePassOneMonth: any = moment().add(1, 'month')
  const inputDataJob: any = reactive({
    id: null,
    title: '',
    field_activity: '',
    work_place: '66',
    contract_type: '70',
    localizaton_country: '',
    localizaton_city: '',
    description: '',
    dead_line: '',
  })

  const state = reactive({
    loading: false,
    loading_jobs: false,
    error_jobs: false,
    loading_jobsFaster: false,
    error_jobsFaster: false,
    loading_category: true,
  })
  const Places = reactive({
    country: [],
    state: [],
    city: [],
  })
  const route = useRouter()
  const router = useRoute()
  const { modal } = useModal()

  const state_job: any = reactive({
    jobs: [],
    job: {},
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
  const jobIndex = async (query?: any) => {
    state_job.loading = state_job.is_paginted == true ? false : true
    state_job.loading_paginied = true

    const findAll = await new JobService().findAll(query)
    if (findAll?.Jobs) {
      state_job.loading = false
      state_job.jobs = findAll?.Jobs

      state_job.jobs.forEach((pro: any) => {
        state_job.cache?.push(pro)
      })

      state_job.count = Number(findAll?.job_current_length)
      state_job.totalCount = Number(findAll?.job_length)
      state_job.loading_paginied = false
    }
    if (findAll?.e) {
      state_job.error = false
      state_job.loading_paginied = false
    }
  }

  // Create Job
  const createNewJob = async () => {
    state.loading = true
    const field = inputDataJob.field_activity
    inputDataJob.field_activity = inputDataJob.field_activity
      ? `${inputDataJob.field_activity['id']}`
      : inputDataJob.field_activity
    const job = await new JobService().create(inputDataJob)
    if (job?.error) {
      state.loading = false
      return (isError.value = job?.error[0])
    }
    isError.value = {}
    state.loading = false

    // Close modal
    modal()

    //Send Notification
    new NotifUtils().createdJob()

    inputDataJob.title = ''
    inputDataJob.description = ''
    inputDataJob.localizaton_city = ''
    inputDataJob.localizaton_country = ''
    inputDataJob.field_activity = ''
    inputDataJob.work_place = '66'
    inputDataJob.contract_type = '70'
  }

  // Update Job
  const updateJob = async () => {
    state.loading = true
    const field = inputDataJob.field_activity
    inputDataJob.field_activity = inputDataJob.field_activity
      ? `${inputDataJob.field_activity['id']}`
      : inputDataJob.field_activity
    const job = await new JobService().update(inputDataJob)
    if (job?.error) {
      state.loading = false
      return (isError.value = job?.error[0])
    }
    isError.value = {}
    state.loading = false
    inputDataJob.field_activity = field

    //Send Notification
    new NotifUtils().success("Offre d'emploi", 'Modifier avec succès')
  }

  // Delete Job
  const loading_delete: any = ref(false)
  const deleteJob = async (data: any) => {
    loading_delete.value = true

    const job = await new JobService().delete(data)
    if (job?.error) {
      state.loading = false
      return (isError.value = job?.error[0])
    }
    isError.value = {}
    loading_delete.value = false

    //Send Notification
    new NotifUtils().success("Offre d'emploi", 'Supprimé avec succès')
    route.push({ name: 'Jobs' })
  }

  // Get all field activity of jobs
  const JobCategories = ref()
  const getAllCategory = async () => {
    state.loading_category = true

    const fand_job = await new JobService().fand_job()
    if (fand_job?.field_activity) return (JobCategories.value = fand_job?.field_activity)

    if (fand_job.e) {
      state.loading_category = false
    }
  }

  // Loacalization
  const localizaton = async () => {
    try {
      const state = await axios.get('/providers/states/state.json')
      const country = await axios.get('/providers/states/country.json')
      const city = await axios.get('/providers/states/cities.json')
      if (state.data && country.data && city.data) {
        Places.country = country.data.countries
        Places.state = state.data.states
        Places.city = city.data.cities
      }
    } catch (error) {}
  }

  const localizatonCity = computed(() => {
    const selectCountry: any = inputDataJob.localizaton_country

    const c = Places.state.filter(({ country_id }) => {
      return selectCountry['id'] == country_id
    })

    const _c = []

    for (let i = 0; i < Places.city.length; i++) {
      const city: any = Places.city[i]

      for (let z = 0; z < c.length; z++) {
        const state: any = c[z]

        if (city.state_id === state.id) {
          _c.push(city)
        }
      }
    }

    return _c
  })

  // Search by domain

  const pass_search_by_domain = ref()
  const SEARCH = computed(() => {
    if (
      router.name === 'Jobs' &&
      router.query.search_by_domain &&
      pass_search_by_domain.value != router.query.search_by_domain
    ) {
      jobIndex(`/?limit=20&page=1&domain=${router.query.search_by_domain}`)
    }
    pass_search_by_domain.value = router.query.search_by_domain
  })

  const { __MAIN_MoreSee } = useCerleComposition()
  const SeeMoreJob = () => {
    __MAIN_MoreSee(state_job, jobIndex, 'jobs')
  }

  // expose managed state as return value
  return {
    state,
    JobCategories,
    inputDataJob,
    datePassOneMonth,
    createNewJob,
    isError,
    localizaton,
    localizatonCity,
    loading_delete,
    deleteJob,
    updateJob,
    Places,
    getAllCategory,
    jobIndex,
    SEARCH,
    state_job,
    SeeMoreJob,
  }
}
