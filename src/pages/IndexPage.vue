
<template>
  <q-page class="flex flex-center q-pa-md bg-grey-2">
    <q-card flat bordered class="form-card q-pa-lg">
      <q-card-section>
        <div class="text-h5 text-weight-bold">Quasar Form</div>
        <div class="text-grey-7 q-mt-sm">
          Please enter your information
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="formRef" class="q-gutter-md" @submit.prevent="submitForm">
          <q-input
            data-testid="input-name"
            v-model="name"
            label="Your name *"
            outlined
            lazy-rules
            :rules="[(val) => !!val.trim() || 'Please type something']"
          />

          <q-input
            data-testid="input-age"
            v-model="age"
            label="Your age *"
            type="number"
            outlined
            lazy-rules
            :rules="[
              (val) => val !== '' && val !== null || 'Please type something',
              (val) => Number.isInteger(Number(val)) && Number(val) > 0 || 'Please type a real age',
            ]"
          />

          <q-checkbox
            data-testid="toggle-accept"
            v-model="accepted"
            label="I accept the license and terms"
          />

          <q-btn
            data-testid="btn-submit"
            label="Submit"
            type="button"
            color="primary"
            class="full-width"
            @click="submitForm"
          />

          <q-btn
            data-testid="btn-reset"
            label="Reset"
            type="button"
            color="grey-7"
            outline
            class="full-width"
            @click="resetForm"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const formRef = ref(null)
const name = ref('')
const age = ref('')
const accepted = ref(false)

async function submitForm() {
  if (!accepted.value) {
    $q.notify({
      type: 'negative',
      message: 'You need to accept the license and terms first',
    })
    return
  }

  const valid = await formRef.value.validate()

  if (!valid) return

  $q.notify({
    type: 'positive',
    message: 'Submitted',
  })
}

function resetForm() {
  name.value = ''
  age.value = ''
  accepted.value = false
  formRef.value.resetValidation()
}
</script>

<style scoped>
.form-card {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
}
</style>
