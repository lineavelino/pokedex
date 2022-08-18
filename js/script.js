$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon?sort=order:asc,url",
  success: function (data) {
    const pokemons = data.results;

    for (let pokemon of pokemons) {
      const pokeUrl = pokemon.url;

      $.get(pokeUrl, function (pokeInfo) {
        const pokeName = pokeInfo.name;
        const pokeImg =
          pokeInfo.sprites.other.dream_world.front_default;
        let pokeTypes = pokeInfo.types;

        $("#pokemon-list").append(
          `
            <li id=${pokeName}>
              <h2>${pokeName}</h2>
              <section>
                <ul class="type-list" id=${pokeInfo.id}></ul>
                <img src=${pokeImg}>
              </section>
            </li>
          `
        );

        let ulPoke = document.getElementById(pokeInfo.id);
        let containerPoke =
          document.getElementById(pokeName);

        function addPokeTypes() {
          for (let i = 0; i < pokeTypes.length; i++) {
            let pokeType = pokeTypes[i].type.name;
            $(ulPoke).append(`<li>${pokeType}</li>`);
          }
        }

        function capitalizeString(string) {
          return (
            string.charAt(0).toUpperCase() + string.slice(1)
          );
        }

        function setBackgroundColor() {
          let firstType = ulPoke.firstChild.textContent;
          let classCss = `
            poke${capitalizeString(firstType)}Container
          `;

          $(containerPoke).addClass(classCss);
        }

        $(document).ready(
          addPokeTypes(),
          setBackgroundColor()
        );
      });
    }
  },
});
