import React from 'react';
import AppBar from 'material-ui/AppBar';
import './../../styles/styles.css';

class AboutPage extends React.Component {
    render() {
        return (
            <div>
                About us
            <h1>
                    Obecna wersja systemu 0.0.9
            </h1>
                <table>
                    <thead>
                        <tr>
                            <th>Version</th>
                            <th>Release date</th>
                            <th>Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0.0.5</td>
                            <td>2016-01-06</td>
                            <td>
                                <ul>
                                    <li>[WEB-4] Global routes map</li>
                                    <li>[WEB-5] Added temprorary template for landing page</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>0.0.6</td>
                            <td>2016-01-23</td>
                            <td>
                                <ul>
                                    <li>[WEB-6] Route details on map</li>
                                    <li>[WEB-7] Route details</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>0.0.7</td>
                            <td>2016-02-27</td>
                            <td>
                                <ul>
                                    <li>[WEB-8] Account registration</li>
                                    <li>[WEB-9] User login</li>
                                    <li>[WEB-10] Confirmation account</li>
                                    <li>[WEB-11] Profile info</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>0.0.8</td>
                            <td>2016-03-20</td>
                            <td>
                                <ul>
                                    <li>[WEB-12] Route filtration</li>
                                </ul>
                            </td>
                        </tr>
                         <tr>
                            <td>0.0.9</td>
                            <td>2016-04-02</td>
                            <td>
                                <ul>
                                    <li>[WEB-13] Reset password</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default AboutPage;