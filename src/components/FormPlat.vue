<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>
    <q-form @submit="formSubmit">
      <q-card-section>
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="plat.nom"
            label="Nom (Burger)"
            class="col"
            :rules="[val => !!val || 'ce champ est obligatoire', val => val.length <= 20 || 'Max 20 caractères']"
            lazy-rules="ondemand"
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="plat.description"
            label="Description"
            type="textarea"
            class="col"
            :rules="[val => val.length <= 155 || 'Maximum 155 caractères !']"
            lazy-rules="ondemand"
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="plat.image"
            label="URL de l'image"
            class="col"/>
          <q-img
            :src="plat.image ? plat.image : 'statics/image-placeholder.png'"
            class="q-ml-sm"
            contain/>
        </div>

        <div class="q-mb-md">
          <div class="row">
            <p class="q-mb-none">Note:</p>
          </div>
          <div class="row">
            <q-rating
              v-model="plat.note"
              size="2em"
              color="orange"/>
          </div>
        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Annuler"
          color="grey"
          v-close-popup/>
        <q-btn
          label="Sauver"
          color="primary"
          type="submit"/>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    action: {
      type: String,
      required: true
    },
    platAModifier: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      plat: {
        name: '',
        description: '',
        note: 1,
        image: ''
      }
    }
  },

  methods: {
    ...mapActions('plats', ['ajouterPlat', 'modifierPlat']),
    formSubmit () {
      // Si la tache à un ID, c'est une modification, sinon c'est un ajout
      if (this.plat.id) {
        // Construction du payload
        const payload = {
          id: this.plat.id,
          updates: this.plat // Passe toutes les propriétés du plat
        }

        this.modifierPlat(payload)
      } else {
        // Ajouter le plat
        this.ajouterPlat(this.plat)
      }

      this.$emit('fermer')
    }
  },

  mounted () {
    if (this.platAModifier) {
      this.plat = Object.assign({}, this.platAModifier)
    }
  }
}
</script>

<style>
.form-card {
  min-width: 400px;
}

.form-card .heading {
  text-transform: capitalize;
}

.form-card .q-card-section {
  width: 100%;
}

.thumbnail {
  max-width: 50px;
  max-height: 50px;
}

.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}

.form-card .q-img__image {
  background-size: cover !important;
}

.form-card .q-rating__icon {
  opacity: 0.2;
}

.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
