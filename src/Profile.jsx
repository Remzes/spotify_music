import React, {Component} from 'react';
import './App.css';

class Profile extends Component {
    render() {
        let artist = {
            name: '',
            followers: {
                total: ''
            },
            images: [
                {
                    url: ''
                }
            ],
            genres: []
        };

        if (this.props.artist) {
            artist = this.props.artist;
        }

        return (
            <div className="profile">
                <img
                    alt="Profile"
                    className="profile-img"
                    src={artist.images[0].url}
                />
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-genres">{artist.followers["total"]} followers</div>
                    <div>
                        {
                            artist.genres.map((genre, k) => {
                                genre = (genre !== artist.genres[artist.genres.length - 1]) ? `${genre}, ` : `& ${genre}`;
                                return (
                                    <span key={k}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;