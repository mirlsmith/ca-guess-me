'use strict'

const STORAGE_KEY = 'questsTreeDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {

  var questsTree = loadFromStorage(STORAGE_KEY)

  if (!questsTree) {

    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  } else gQuestsTree = questsTree
  
  gCurrQuest = gQuestsTree
  gPrevQuest = null

  _saveQuestsTreeToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  //update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  //Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt)
  const newGuess = createQuest(newGuessTxt)

  gPrevQuest[lastRes] = newQuest
  newQuest.yes = newGuess
  newQuest.no = gCurrQuest

  _saveQuestsTreeToStorage()

}

function getCurrQuest() {
  return gCurrQuest
}

function _saveQuestsTreeToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

