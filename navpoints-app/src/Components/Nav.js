import { useState, useEffect} from 'react';
import styled, { createGlobalStyle } from "styled-components";
import home from "./Icons/home.svg"
import mapmarker from "./Icons/map-markerActive.svg"
import book from './Icons/book.svg'
export default function Nav() {
 
 
    return (
      <div id="nav"
      style={{
        backgroundColor: "white",
        display: 'flex',
        justifyContent: "space-evenly",
        alignContent: "center",
        zIndex:2,
        top: -200,
        position: "relative"

      }}>
        <ul
        style={{ display: "flex",
          listStyle: "none"}}><li> <img src={home} style={{width:"25%"}}/></li>
        <li><img src={mapmarker} style={{width:"25%"}}/></li>
        <li><img src={book} style={{width:"25%"}}/></li></ul>
        
      </div>
    );
  }
  
 