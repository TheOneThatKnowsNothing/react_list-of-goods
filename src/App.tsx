import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((firstItem, secondItem) => {
      return sortType === SortType.LENGTH
        ? firstItem.length - secondItem.length
        : firstItem.localeCompare(secondItem);
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  handleClickReverse = () => {
    this.setState((state) => ({ isReversed: !state.isReversed }));
  };

  handleClickSortByLength = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  handleClickSortAlphabetically = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  handleClickReset = () => {
    this.setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  render() {
    const { sortType, isReversed } = this.state;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn(
              'button is-info',
              {
                'is-light': sortType !== SortType.ALPHABET,
              },
            )}
            onClick={this.handleClickSortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn(
              'button is-success',
              {
                'is-light': sortType !== SortType.LENGTH,
              },
            )}
            onClick={this.handleClickSortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn(
              'button is-warning',
              {
                'is-light': !isReversed,
              },
            )}
            onClick={this.handleClickReverse}
          >
            Reverse
          </button>

          {
            ((isReversed || sortType !== SortType.NONE) && (
              <button
                type="button"
                className="button is-warning is-light"
                onClick={this.handleClickReset}
              >
                Reset
              </button>
            ))
          }
        </div>

        <ul>
          <ul>
            {getReorderedGoods(goodsFromServer, this.state).map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
