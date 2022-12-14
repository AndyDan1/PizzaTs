import React, {memo} from "react";

interface ICategoriesProps {
  categoryId: number;
  onClickCategory: (index: number) => void;
}

const Categories: React.FC<ICategoriesProps> = ({categoryId, onClickCategory}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) =>
          <li
            key={item}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {item}
          </li>
        )}
      </ul>
    </div>
  )
}

export default memo(Categories);
