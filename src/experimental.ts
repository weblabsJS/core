import { div } from "./components";
import { WebLabsElement, State, state} from "./index";

export interface Diff<type> {
    operationName: "push" | "pop" | "insertBefore" | "insertAfter" | "alterAt" | "removeAt",
    operationValue: type
}

export interface kv<type> {

    key: number,
    value: type

}

export function KeyV<type>(value: type, key: number): kv<type> {
    return {
        key,
        value
    }
}

export interface ArrayStoreType<type> extends state<kv<type>[]> {
    push: (value: type) => void,
    pop: () => void;
    sync: () => void,
    addToSync: (callback: (udiff: Diff<any>[]) => void) => void,
    getArray: () => kv<type>[],
    insertBefore: (value: type, index: number) => void
    insertAfter: (value: type, index: number) => void,
    filter: (callback: (value: type, index: number) => Boolean) => void,
    alter: (index: number, value: type) => void
}

export function ArrayStore<type>(initial: type[]): ArrayStoreType<type> {


    var diffingArray: kv<type>[] = initial.map((v, k) => KeyV(v, k))

    const store = State<kv<type>[]>(diffingArray)

    var diff: Diff<any>[] = []

    var syncCandidates: ((fx: Diff<any>[]) => void)[] = []

    function sync() {
        syncCandidates.forEach(candidate => candidate(diff))
        diff = [] //reset the diff to understand sync
    }

    function addToSync(callback: (udiff: Diff<any>[]) => void) {
        syncCandidates.push(callback)
    }

    function push(value: type) {

        diffingArray.push(KeyV(value, diffingArray.length))
        store.set(diffingArray)
        diff.push({
            operationName: "push",
            operationValue: value
        })

        sync()

    }

    function pop() {

        diffingArray.pop()
        store.set(diffingArray)
        diff.push({
            operationName: "pop",
            operationValue: undefined
        })

        sync()

    }

    function insertAfter(value: type, index: number) {

        var temp = [
            ...diffingArray.slice(0, index + 1),
            KeyV(value, index),
            ...diffingArray.slice(index + 1, diffingArray.length)
        ]

        diffingArray = temp
        store.set(diffingArray)

        diff.push({
            operationName: "insertAfter",
            operationValue: {
                index,
                value
            }
        })
        
        sync()

    }

    function insertBefore(value: type, index: number) {

        var temp = [
            ...diffingArray.slice(0, index),
            KeyV(value, index),
            ...diffingArray.slice(index, diffingArray.length)
        ]

        diffingArray = temp
        store.set(diffingArray)

        diff.push({
            operationName: "insertAfter",
            operationValue: {
                index,
                value
            }
        })
        
        sync()

    }

    function filter(callback: (value: type, index: number) => Boolean) {

        var temp: kv<type>[] = 
            diffingArray.filter(
                (v, i) => {

                    const runner = callback(v.value, v.key)
                    if ( runner == false ) {

                        diff.push({
                            operationName: "removeAt",
                            operationValue: i
                        })

                    }

                    return runner

                }
            )
        
        diffingArray = temp
        store.set(diffingArray)
        sync()

    }

    function alter(index: number, val: type) {

        //this function will alter the value at that given index
        diffingArray.forEach((value, i) => {

            if ( value.key == index ) {
                value.value = val
                
                diff.push({
                    operationName: 'alterAt',
                    operationValue: {
                        value: val,
                        index: i
                    }
                })

            }

            return

        })

        sync()

    }

    return {
        ...store,
        push,
        pop,
        getArray: function() {
            return store.get()
        },
        filter,
        insertBefore,
        insertAfter,
        sync,
        addToSync,
        alter
    }

}

export function ListView<type>(
    array: ArrayStoreType<type>,
    builder: (value: type, index: number) => WebLabsElement,
    parent: WebLabsElement = div()
) {

    //first we will create the divs.
    const dataArray = array.getArray()
    dataArray.forEach((data) => {

        parent
            .coreElement
            .appendChild(
                builder(data.value, data.key).coreElement
            )

    })

    array.addToSync((udiff: Diff<any>[]) => {

        udiff.forEach((diff: Diff<any>) => {

            switch (diff.operationName) {

                case "push":
                    const subject = array.getArray()

                    parent.coreElement
                        .appendChild(
                            builder(diff.operationValue, subject.length - 1)
                                .coreElement
                        )

                    break
                
                case "pop":
                    parent.coreElement
                        .lastChild.remove()

                    break
                
                case "insertAfter":
                    //insertAfter will be of two values,
                    /**
                     * {
                     *      index: number,
                     *      value: value
                     * }
                     */

                    parent
                        .coreElement
                        .children[diff.operationValue.index]
                            .after(
                                builder(diff.operationValue.value, diff.operationValue.index + 1)
                                    .coreElement
                            )

                    break
                
                case "insertBefore":
                    parent
                        .coreElement
                        .children[diff.operationValue.index]
                            .before(
                                builder(diff.operationValue.value, diff.operationValue.index - 1)
                                    .coreElement
                            )
                    break
                
                case "alterAt":
                    //the diff value will have index, and new value to be stored
                    parent
                        .coreElement
                        .children[
                            diff.operationValue.index
                        ].replaceWith(
                            builder(
                                diff.operationValue.value,
                                diff.operationValue.index
                            ).coreElement
                        )
                    break
                
                case "removeAt":
                    parent
                        .coreElement
                        .children[
                            diff.operationValue //this will be index by default
                        ].remove()
                    break

            }

        })

    })

    return parent

}