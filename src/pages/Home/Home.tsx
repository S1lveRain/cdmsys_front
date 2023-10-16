import React from 'react';
import { Model } from '../../components/Model/Model';
import styles from './Home.module.css'
import {useGetModelsQuery} from "../../app/api/ModelsApi";

export const Home = () => {
    const {data} = useGetModelsQuery('');
    return (
      <div>
          {data && data.map((el: any) => {
              return (
                  <div className={styles.homeWrapper}>
                      <Model name={el.modelName} count={el.count} />
                  </div>
              )
          })}
      </div>
    );
};