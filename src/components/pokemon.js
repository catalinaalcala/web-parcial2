import React from 'react';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

export default class Pokemon extends React.Component {

    render() {
        return (
                <tr>
                    <th class="align-middle" scope="row">{this.props.pokemon.id}</th>
                    <td class="align-middle">
                        <Image src={this.props.pokemon.ThumbnailImage} rounded />
                    </td>
                    <td class="align-middle">{this.props.pokemon.name}</td>
                    <td class="align-middle">{this.props.pokemon.description}</td>
                    <td class="align-middle">{this.props.pokemon.height}</td>
                    <td class="align-middle">{this.props.pokemon.weight}</td>
                    <td class="align-middle">{this.props.pokemon.type.map( (e,i) => <Badge variant="secondary">{e}</Badge>)}</td>
                </tr>
        );
    }
}