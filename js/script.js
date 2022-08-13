$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon",
  success: function (data) {
    const pokemons = data.results;

    pokemons.map((pokemon) => {
      const pokeUrl = pokemon.url;

      $.get(pokeUrl, function (pokeInfo) {
        const pokeName = pokeInfo.name;
        const pokeImg =
          pokeInfo.sprites.other.dream_world.front_default;
        let pokeTypes = pokeInfo.types;

        $("#pokemon-list").append(
          `
            <li class="pokeGrassContainer">
              <h2>${pokeName}</h2>
              <section>
                <ul class="type-list" id=${pokeInfo.id}></ul>
                <img src=${pokeImg}>
              </section>
            </li>
          `
        );

        let ulPoke = document.getElementById(pokeInfo.id);

        function addPokeTypes() {
          for (let i = 0; i < pokeTypes.length; i++) {
            let pokeType = pokeTypes[i].type.name;
            $(ulPoke).append(`<li>${pokeType}</li>`);
          }
        }
        $(document).ready(getPokeTypes(pokeTypes));
      });
    });
  },
});
