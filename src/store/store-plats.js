// State : données du magasin
const state = {
  // Tableau des plats
  plats: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      nom: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      nom: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      nom: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiment mais alors vraiment pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      nom: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ]
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  // Récupère les plats
  // TODO Simplifier la syntaxe de retour
  // plats: (state) => state.plats
  plats: (state) => {
    return [...state.plats].sort(function (a, b) { return a.nom.localeCompare(b.nom, 'fr') })
    // TODO retourner une copie du state
    // TODO ajouter un tri aux données
    /*
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // https://usefulangle.com/post/227/javascript-sort-array-of-objects
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    */
  }
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /**
   * Ajoute un plat
   * @param state
   * @param plat plat à ajouter
   */
  // TODO nommer les actions en majuscules
  // ajouterPlat => AJOUTER_PLAT
  ajouterPlat (state, plat) {
    state.plats.push(plat)
  },

  /**
   * Modifie un plat
   * @param state
   * @param payload contient l'id du plat à modifier et les modifications à effectuer
   */
  modifierPlat (state, payload) {
    // Recuperation de l'index du plat à modifier
    const index = state.plats.findIndex(el => el.id === payload.id)

    // Si le plat existe
    if (index !== -1) {
      Object.assign(state.plats[index], payload.updates)
    }
  },

  /**
   * Supprime un plat
   * @param state
   * @param id id du plat à supprimer
   */
  supprimerPlat (state, id) {
    state.plats = state.plats.filter(el => el.id !== id)
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations.
Elles peuvent être asynchrones !
 */
const actions = {

  /**
   * Ajoute un plat
   * @param commit
   * @param plat plat à ajouter
   */
  ajouterPlat ({ commit }, plat) {
    let uId = 1

    if (state.plats.length) {
      uId = Math.max(...state.plats.map(plat => plat.id)) + 1
    }
    /*
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      let a = [10, 20]
      let b = [4, ...a]

      console.log(b)

      a = {nom: 'Steve', age: 33}
      b = {prenom: 'paul', ...a}

      console.log(b)

     */

    plat.id = uId
    commit('ajouterPlat', plat)
  },

  /**
   * Modifie un plat
   * @param commit
   * @param payload contient l'id du plat à modifier et les modifications à effectuer
   */
  modifierPlat ({ commit }, payload) {
    commit('modifierPlat', payload)
  },

  /**
   * Supprime un plat
   * @param commit
   * @param id id du plat a supprimer
   */
  supprimerPlat ({ commit }, id) {
    commit('supprimerPlat', id)
  }
}
/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
