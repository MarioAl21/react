/*
 Date: 17/02/2024
 Author: Mario A. N. Zavala
*/

import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Divider, TextField } from "@material-ui/core";
import DataTable from "react-data-table-component";
import SearchIcon from "@material-ui/icons/Search";

export const PokeTable = () => {
  // Arrays of pokemon depending their state: wild (we can capture), trapped (we can call it to battle)
  //                                          & transfer (send it to Oak professor, In reality we return it to "wildPokemon" array)
  const [availablePokemon, setAvailablePokemon] = useState([]); // I have to rename it to "WildPokemon"
  const [pendingPokemon, setPendingPokemon] = useState([]); // I have to rename it to "TrappedPokemon"
  const [trappedPokemon, setTrappedPokemon] = useState([]); // I have to rename it to "TransferPokemon"
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  // Control the gap among the tables
  const space = 5;

  // Call to the EDPOINT (pokeApi)
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
        const data = await res.json();
        console.log(data?.results);

        // Fetch additional details for each Pokemon, including the image URL from the official PokeAPI
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default, // Use the official PokeAPI image URL
              type: details.types[0].type.name,
            };
          })
        );

        setAvailablePokemon(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    getPokemon();
  }, []);

  // Functions to move one pokemon from one state ot another:
  //    *Wild
  //    *Trapped
  //    *For transfering
  // NOTE: I have to rename correctly the current name of them to avoid any confusing
  const handleMoveToWild = (pokemon) => {
    const updatedAvailablePokemon = [...trappedPokemon];
    const pokemonIndex = updatedAvailablePokemon.findIndex(
      (p) => p.id === pokemon.id
    );
    const movedPokemon = updatedAvailablePokemon.splice(pokemonIndex, 1)[0];
    setAvailablePokemon((prevPendingPokemon) => [
      ...prevPendingPokemon,
      movedPokemon,
    ]);
    setTrappedPokemon(updatedAvailablePokemon);
  };
  const handleMoveToPending = (pokemon) => {
    const updatedAvailablePokemon = [...availablePokemon];
    const pokemonIndex = updatedAvailablePokemon.findIndex(
      (p) => p.id === pokemon
    );
    const movedPokemon = updatedAvailablePokemon.splice(pokemonIndex, 1)[0];
    setPendingPokemon((prevPendingPokemon) => [
      ...prevPendingPokemon,
      movedPokemon,
    ]);
    setAvailablePokemon(updatedAvailablePokemon);
  };
  const handleMoveToTrapped = (pokemon) => {
    const updatedAvailablePokemon = [...pendingPokemon];
    const pokemonIndex = updatedAvailablePokemon.findIndex(
      (p) => p.id === pokemon.id
    );
    const movedPokemon = updatedAvailablePokemon.splice(pokemonIndex, 1)[0];
    setTrappedPokemon((prevPendingPokemon) => [
      ...prevPendingPokemon,
      movedPokemon,
    ]);
    setPendingPokemon(updatedAvailablePokemon);
  };

  // HEADS or titles of every table.
  // NOTE: The only thing that chenges is the function invoked by the button. I have to dive into how reuse these one
  const headsWild = [
    {
      name: "#",
      id: "#",
      sortable: false,
      selector: (row) => row.id,
      width: "80px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Pokemon",
      id: "Pokemon",
      sortable: false,
      selector: (row) => row.name,
      width: "130px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Appearance",
      id: "Appearance",
      sortable: false,
      selector: (row) => (
        <img
          src={row.image}
          alt={row.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
      width: "100px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Type",
      id: "Type",
      sortable: false,
      selector: (row) => {
        switch (row.type) {
          case "grass":
            return <span>🌱</span>;
          case "water":
            return <span>💧</span>;
          case "fire":
            return <span>🔥</span>;
          case "bug":
            return <span>🐞</span>;
          default:
            return <span>☀</span>;
        }
      },
      width: "80px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Actions",
      id: "Actions",
      sortable: false,
      selector: (row) => {
        const id = row.id;
        return <button onClick={() => handleMoveToPending(id)}>Trapped</button>;
      },
      width: "150px",
      wrap: true,
      fixed: "center",
    },
  ];

  const headsTrapped = [
    {
      name: "#",
      id: "#",
      sortable: false,
      selector: (row) => row.id,
      width: "80px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Pokemon",
      id: "Pokemon",
      sortable: false,
      selector: (row) => row.name,
      width: "130px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Appearance",
      id: "Appearance",
      sortable: false,
      selector: (row) => (
        <img
          src={row.image}
          alt={row.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
      width: "100px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Type",
      id: "Type",
      sortable: false,
      selector: (row) => {
        switch (row.type) {
          case "grass":
            return <span>🌱</span>;
          case "water":
            return <span>💧</span>;
          case "fire":
            return <span>🔥</span>;
          case "bug":
            return <span>🐞</span>;
          default:
            return <span>☀</span>;
        }
      },
      width: "80px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Actions",
      id: "Actions",
      sortable: false,
      selector: (row) => {
        const id = row.id;
        return (
          <button onClick={() => handleMoveToTrapped(id)}>I choose you!</button>
        );
      },
      width: "150px",
      wrap: true,
      fixed: "center",
    },
  ];

  const headsTransfer = [
    {
      name: "#",
      id: "#",
      sortable: false,
      selector: (row) => row.id,
      width: "80px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Pokemon",
      id: "Pokemon",
      sortable: false,
      selector: (row) => row.name,
      width: "130px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Appearance",
      id: "Appearance",
      sortable: false,
      selector: (row) => (
        <img
          src={row.image}
          alt={row.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
      width: "100px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Type",
      id: "Type",
      sortable: false,
      selector: (row) => {
        switch (row.type) {
          case "grass":
            return <span>🌱</span>;
          case "water":
            return <span>💧</span>;
          case "fire":
            return <span>🔥</span>;
          case "bug":
            return <span>🐞</span>;
          default:
            return <span>☀</span>;
        }
      },
      width: "80px",
      wrap: true,
      fixed: "center",
    },
    {
      name: "Actions",
      id: "Actions",
      sortable: false,
      selector: (row) => {
        const id = row.id;
        return (
          <button onClick={() => handleMoveToWild(id)}>
            Send to Oak Prof.
          </button>
        );
      },
      width: "150px",
      wrap: true,
      fixed: "center",
    },
  ];

  // Tables
  return (
    <>
    <Grid item xs={6}>
        <SearchIcon style={{ color: "white" }} />
        <TextField
          placeholder="Buscar"
          title="Puede buscar por solicitante, nave, usuario, comentario o fecha"
          className={{
            marginLeft : "8px",
            marginRight: "10px",
            color      : "white",
            textAlign  : "left",
          }}
          id="txtSearch"
          value={searchedPokemon}
          onChange={(e) => {
            setSearchedPokemon(e.target.value);
          }}>
          Buscar
        </TextField>
    </Grid>
    <Grid container item style={{ padding: `${space}px`, margin: "30px" }}>
      <Grid item xs={3.5} style={{ padding: `${space}px` }}>
        <Card>
          <Grid item xs={12}>
            <Grid
              item
              style={{
                textAlign: "center",
                paddingBottom: 20,
                background: "#4c5356",
              }}>
              <Typography variant="h6" style={{ color: "#FFF" }}>
                Wild Prokemon
              </Typography>
              <Divider style={{ background: "#a8adb3" }} />
            </Grid>
          </Grid>
          <DataTable
            columns={headsWild}
            data={availablePokemon}
            pagination
            dense={true}
            Header
            rows
            paginationPerPage={9}
            highlightOnHover
            customStyles={{
              header: {
                style: {
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "36px",
                  backgroundColor: "#004666",
                },
              },
              headCells: {
                style: {
                  color: "#FFF",
                  fontSize: "14px",
                  backgroundColor: "#004666",
                },
              },
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={3.2} style={{ padding: `${space}px` }}>
        <Card>
          <Grid item xs={12}>
            <Grid
              item
              style={{
                textAlign: "center",
                paddingBottom: 20,
                background: "#4c5356",
              }}>
              <Typography variant="h6" style={{ color: "#FFF" }}>
                Trapped Prokemon
              </Typography>
              <Divider style={{ background: "#a8adb3" }} />
            </Grid>
          </Grid>
          <DataTable
            columns={headsTrapped}
            data={pendingPokemon}
            pagination
            dense={true}
            Header
            rows
            paginationPerPage={9}
            highlightOnHover
            customStyles={{
              header: {
                style: {
                  fontWeight: "bold",
                  color: "#FFF",
                  fontSize: "36px",
                  backgroundColor: "#004666",
                },
              },
              headCells: {
                style: {
                  color: "#FFF",
                  fontSize: "14px",
                  backgroundColor: "#004666",
                },
              },
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={3.5} style={{ padding: `${space}px` }}>
        <Card>
          <Grid item xs={12}>
            <Grid
              item
              style={{
                textAlign: "center",
                paddingBottom: 20,
                background: "#4c5356",
              }}>
              <Typography variant="h6" style={{ color: "#FFF" }}>
                Transfer Prokemon
              </Typography>
              <Divider style={{ background: "#a8adb3" }} />
            </Grid>
          </Grid>
          <DataTable
            columns={headsTransfer}
            data={trappedPokemon}
            pagination
            dense={true}
            Header
            rows
            paginationPerPage={9}
            highlightOnHover
            customStyles={{
              header: {
                style: {
                  fontWeight: "bold",
                  color: "#FFF",
                  fontSize: "36px",
                  backgroundColor: "#004666",
                },
              },
              headCells: {
                style: {
                  color: "#FFF",
                  fontSize: "14px",
                  backgroundColor: "#004666",
                },
              },
            }}
          />
        </Card>
      </Grid>
    </Grid>
    </>
  );
};
