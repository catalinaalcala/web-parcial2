import Pokemon from "./pokemon";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {FormattedMessage} from 'react-intl';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function PokeList(props)  {

    let [monsters, setMonsters] = useState([]);

    const url = props.lan === "es"? "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json"
                : "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("monsters") === null) {
                setMonsters([])
            } else {
                setMonsters(JSON.parse(localStorage.getItem("monsters")));
            }
        } else {
            fetch(url).then(res=>res.json()).then(res=>{
                setMonsters(res);
                localStorage.setItem("monsters", JSON.stringify(res));
            });
        }
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <Table striped hover>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col"><FormattedMessage id="Image"/></th>
                            <th scope="col"><FormattedMessage id="Name"/></th>
                            <th scope="col"><FormattedMessage id="Description"/></th>
                            <th scope="col"><FormattedMessage id="Height"/></th>
                            <th scope="col"><FormattedMessage id="Weight"/></th>
                            <th scope="col"><FormattedMessage id="Type"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {monsters.map( (e,i) => <Pokemon key={i} pokemon={e}/>)}
                    </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default PokeList;