<template>
  <q-card
    class="card">
    <q-img
      :src="plat.image ? plat.image : 'statics/image-placeholder.png'"
      basic
      contain
    >
      <div class="absolute-bottom text-h6">
        {{ plat.nom }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        readonly
        :model-value="plat.note"
        size="2em"
        color="orange"
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section class="description" :class="{'text-italic': !plat.description}">
      {{ plat.description ? plat.description : 'Aucune description fournie' }}
    </q-card-section>

    <q-card-actions
      class="absolute-bottom"
      align="right">
      <q-btn
        @click="afficherFormPlat = true"
        icon="edit"
        color="blue"
        flat>Modifier
      </q-btn>
      <q-btn
        icon="delete"
        color="red"
        @click="confirmerSuppression(plat.id)"
        flat>Supprimer
      </q-btn>
    </q-card-actions>

    <q-dialog
      v-model="afficherFormPlat">
      <form-plat
        action="modifier"
        :plat-a-modifier="plat"
        @fermer="afficherFormPlat = false"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['plat'],
  data () {
    return {
      afficherFormPlat: false
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  },
  methods: {

    ...mapActions('plats', ['supprimerPlat']),

    confirmerSuppression (id) {
      this.$q.dialog({
        title: 'Supprimer plat',
        message: 'Voulez-vous vraiement supprimer ce plat ?',
        cancel: 'Annuler',
        ok: 'Supprimer',
        persistent: true
      }).onOk(() => {
        this.supprimerPlat(id)
      })
    }
  }
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  background: #bdbdbd !important;
}

.card .q-img {
  max-height: 180px;
}

.card .q-img__image {
  background-size: cover !important;
}

.card .q-rating__icon {
  opacity: 0.2;
}

.card .q-rating__icon--active {
  opacity: 1;
}

.card .description {
  padding: 5px 16px;
}
</style>
