import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            artist: '',
            tracks: ''
        };
    }

    search(){

        const BASE_URL = "https://api.spotify.com/v1/search?";
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `https://api.spotify.com/v1/artists/`;

        const accessToken = 'BQBZQUEezLEowbEs0FZcTRVW1l9OJRWQT6Iau5kOcuBx_1hH1RwasFzD75k_9CI5B9q0XMIg5y_C7cf7p2yuG2LQ0zKG6h5hgts4gZIKYCbQvhRkFgUcSMLIlR2BEjz8kbrtIWByxIkKwgSXwgspitLFKqIWhHmZlWjRWmYncYhnG1A70kA&refresh_token=AQBtIz-F-3yaF4zxzy_3FFPmQJkdcv1hZurPNrHCqtipXMWRGFX90GinxcLOSWSMab0ZCFosKxQ7ejfjg-O8P7JCHjtQCrBfDaZEbTxYig6byodOIS6ac1xUyKCboL7qQ3s';

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                const artist = json.artists.items[0];
                this.setState({artist});

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=CA`;
                fetch(FETCH_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        // console.log("tracks", json);
                        const {tracks} = json;
                        this.setState({tracks});
                        // console.log(this.state.tracks);
                    })
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Search</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value = {this.state.query}
                            onChange  = {event => {this.setState({query: event.target.value})}}
                            onKeyPress = {event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => {this.search()}}>
                            <Glyphicon
                                glyph="search"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    {
                        this.state.artist
                        ?
                            <div>
                                <Profile
                                    artist={this.state.artist}
                                />
                                <Gallery
                                    tracks={this.state.tracks}
                                />
                            </div>
                        : <div></div>
                    }
                </FormGroup>
            </div>
        )
    }
}

export default App;