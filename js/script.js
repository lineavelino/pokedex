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

        async function getPokeTypes(pokeTypes) {
          for (let i = 0; i < pokeTypes.length; i++) {
            let ulPoke = await document.getElementById(pokeInfo.id);
            let pokeType = pokeTypes[i].type.name;

            $(ulPoke).append(`<li>${pokeType}</li>`);
          }
        }

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

        $(document).ready(getPokeTypes(pokeTypes));
      });
    });
  },
});
