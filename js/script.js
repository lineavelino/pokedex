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
        const pokeTypes = pokeInfo.types;

        $("#pokemon-list").append(
          `
            <li class='pokeGrassContainer'>
                <h2>${pokeName}</h2>
                <section>
                    <ul class='type-list' id=${pokeInfo.id}>
                    ${pokeTypes.map((pokeType) => {
                      $(".type-list").append(
                        `<li>${pokeType.type.name}</li>`
                      );
                    })}                        
                    </ul>
                    <img src=${pokeImg}>
                </section>
            </li>
          `
        );
      });
    });
  },
});
