import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

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
}
