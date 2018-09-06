// @flow

import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import styles from './Student.css';

type Props = {};

export default class Student extends Component<Props> {
  props: Props;

  state = {
    rating: 0
  };

  changeRating = (newRating: number) => {
    const { rating } = this.state;
    if (rating === newRating) {
      this.setState({
        rating: 0
      });
    } else {
      this.setState({
        rating: newRating
      });
    }
  };

  render() {
    const { rating } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.inputs}>
          <input
            className={styles.studentName}
            type="text"
            placeholder="John Smith"
          />
          <input
            className={styles.studentUsername}
            type="text"
            placeholder="john543"
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.clonePull}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 17"
              width="25px"
              height="16px"
            >
              <g
                id="Group_37"
                data-name="Group 37"
                transform="translate(-580.843 -39.883)"
              >
                <path
                  id="upload"
                  className={styles.icon}
                  d="M20.211-14.148c-.726-3.525-2.542-5.574-6.71-5.465a8.634,8.634,0,0,0-7.279,4.547c-3.214.415-6.2,1.949-6.145,5.9C.078-5.746,2.8-3.4,6.223-3.4H19.7c2.9,0,5.59-2.59,5.548-5.088C25.25-10.07,25.1-13.817,20.211-14.148Z"
                  transform="translate(581.266 60)"
                />
                <path
                  id="upload-2"
                  data-name="upload"
                  className={styles.icon}
                  d="M6.6,4.712v3.77H2.827V4.712H0L4.712,0,9.424,4.712Z"
                  transform="translate(598.92 53.49) rotate(180)"
                />
              </g>
            </svg>
          </div>
          <div className={styles.comment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 16"
              width="16px"
              height="16px"
            >
              <path
                id="message"
                className={styles.icon}
                d="M17.34-43.888H5.482A1.487,1.487,0,0,0,4-42.405v13.34l2.965-2.965H17.34a1.487,1.487,0,0,0,1.482-1.482v-8.894a1.487,1.487,0,0,0-1.482-1.482Z"
                transform="translate(-3.5 44.388)"
              />
            </svg>
          </div>

          <StarRatings
            rating={rating}
            starRatedColor="#FFC646"
            starHoverColor="#FFC646"
            changeRating={this.changeRating}
            numberOfStars={3}
            starDimension="20px"
            starSpacing="1px"
            name="rating"
          />

          <div className={styles.menu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3 17"
              width="3px"
              height="17px"
            >
              <g
                id="Group_39"
                data-name="Group 39"
                transform="translate(-610 -204)"
              >
                <circle
                  id="Ellipse_26"
                  data-name="Ellipse 26"
                  className={styles.menuIcon}
                  cx="1.5"
                  cy="1.5"
                  r="1.5"
                  transform="translate(610 204)"
                />
                <circle
                  id="Ellipse_27"
                  data-name="Ellipse 27"
                  className={styles.menuIcon}
                  cx="1.5"
                  cy="1.5"
                  r="1.5"
                  transform="translate(610 211)"
                />
                <circle
                  id="Ellipse_28"
                  data-name="Ellipse 28"
                  className={styles.menuIcon}
                  cx="1.5"
                  cy="1.5"
                  r="1.5"
                  transform="translate(610 218)"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
