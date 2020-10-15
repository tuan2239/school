import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  private getChildrenQuery: DocumentNode = gql`
    {
      children{
        id
        name
        grade
      }
    }
`;
  private addChildMutation: DocumentNode = gql`
    mutation addChild($name: String!, $grade: Int!){
        addChild(name: $name, grade: $grade){
        id
      }
    }
  `;
  private updateChildMutation: DocumentNode = gql`
    mutation updateChild($child: ChildrenUpdateInput!){
      updateChild(child: $child){
        id
      }
    }
  `;
  private deleteChildMutation: DocumentNode = gql`
    mutation removeChild($id: ID!){
      removeChild(id: $id){
      }
    }
  `;


  constructor(
    private apollo: Apollo
  ) { }

  public getChildren(): any {
    return this.apollo.watchQuery({
      query: this.getChildrenQuery
    })
  }

  public addChild(child: any): any {
    return this.apollo.mutate({
      mutation: this.addChildMutation,
      variables: child,
      refetchQueries: [
        {
          query: this.getChildrenQuery
        }
      ]
    })
  }

  public updateChild(data: any): any {
    const registerInfo = {
      child: data
    };
    return this.apollo.mutate({
      mutation: this.updateChildMutation,
      variables: registerInfo,
      refetchQueries: [
        {
          query: this.getChildrenQuery
        }
      ]
    })
  }

  public removeChild(data: string): any {
    const id = {
      id: data
    }
    return this.apollo.mutate({
      mutation: this.deleteChildMutation,
      variables: id,
      refetchQueries: [
        {
          query: this.getChildrenQuery
        }
      ]
    })
  }

}
