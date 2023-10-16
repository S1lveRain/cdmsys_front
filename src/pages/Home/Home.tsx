import React from 'react';
import { Item } from '../../components/Item/Item';
import styles from './Home.module.css'
import {useGetModelsQuery} from "../../app/api/ModelsApi";

export const Home = () => {
    const {data} = useGetModelsQuery('');
    return (
      <div>
          {data && data.map((el: any) => {
              return (
                  <div className={styles.homeWrapper}>
                      <Item name={el.modelName} count={el.count} />
                  </div>
              )
          })}
      </div>
    );
};