import Attribute from "./characterAttribute.js";
import CharacterText from "./characterText.js";
import SavingThrows from "./characterSavingThrows.js";
import CharacterStats from "./characterStats.js";
import DeathSaves from "./deathSaves.js";
import HitDice from "./hitDice.js";
import AttAndSpells from "./attacksAndSpellcasting.js";
import CharacterSpells from "./characterSpells.js";
import SpellNames from "./spellNames.js";
import CharacterCantrips from "./characterCantrips.js";
import AppearanceAndBackground from "./appearanceAndBackground.js";
import EquipmentAndProficiencies from "./equipmentAndProficiencies.js";
import TraitsAndMore from "./traitsAndMore.js";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { decode } from "base64-arraybuffer";
import toast from "react-hot-toast";

export default function FullCharacterSheet({
  nameValue,
  background,
  description,
  characterClass,
  race,
  alignment,
  currentPc,
  pc_id,
  b64,
}) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const ref = useRef(null);

  const [pc, setPc] = useState(currentPc);
  const [characterName, setCharacterName] = useState(() =>
    !pc ? nameValue : pc.pc_name
  );
  const [characterDescription, setCharacterDescription] = useState(() =>
    !pc ? description : pc.pc_data.characterAppearance
  );
  const [characterBackground, setCharacterBackground] = useState(() =>
    !pc ? background : pc.pc_data.characterBackground
  );
  const [classBackground, setClassBackground] = useState(() =>
    !pc ? "" : pc.pc_data.classBackground
  );
  const [characterCharacterClass, setCharacterCharacterClass] = useState(() =>
    !pc ? characterClass : pc.pc_data.classAndLevel
  );
  const [characterRace, setCharacterRace] = useState(() =>
    !pc ? race : pc.pc_data.race
  );
  const [characterAlignment, setCharacterAlignment] = useState(() =>
    !pc ? alignment : pc.pc_data.alignment
  );
  const [characterExperience, setCharacterExperience] = useState(() =>
    !pc ? "" : pc.pc_data.experience
  );
  const [characterSpellLevel, setCharacterSpellLevel] = useState(() =>
    !pc ? "" : pc.pc_data.level
  );
  const [characterInspiration, setCharacterInspiration] = useState(() =>
    !pc ? "" : pc.pc_data.inspiration
  );
  const [characterProficiencyBonus, setCharacterProficiencyBonus] = useState(
    () => (!pc ? "" : pc.pc_data.proficiencyBonus)
  );
  const [characterStrength, setCharacterStrength] = useState(() =>
    !pc ? "" : pc.pc_data.strength
  );
  const [characterStrengthModifier, setCharacterStrengthModifier] = useState(
    () => (!pc ? "" : pc.pc_data.strengthModifier)
  );
  const [characterStrengthSave, setCharacterStrengthSave] = useState(() =>
    !pc ? "" : pc.pc_data.strengthSave
  );
  const [characterStrengthSaveChecked, setCharacterStrengthSaveChecked] =
    useState(() => (!pc ? "" : pc.pc_data.strengthSaveChecked));
  const [characterDexterity, setCharacterDexterity] = useState(() =>
    !pc ? "" : pc.pc_data.dexterity
  );
  const [characterDexterityModifier, setCharacterDexterityModifier] = useState(
    () => (!pc ? "" : pc.pc_data.dexterityModifier)
  );
  const [characterDexteritySave, setCharacterDexteritySave] = useState(() =>
    !pc ? "" : pc.pc_data.dexteritySave
  );
  const [characterDexteritySaveChecked, setCharacterDexteritySaveChecked] =
    useState(() => (!pc ? "" : pc.pc_data.characterDexteritySaveChecked));
  const [characterConstitution, setCharacterConstitution] = useState(() =>
    !pc ? "" : pc.pc_data.constitution
  );
  const [characterConstitutionModifier, setCharacterConstitutionModifier] =
    useState(() => (!pc ? "" : pc.pc_data.constitutionModifier));
  const [characterConstitutionSave, setCharacterConstitutionSave] = useState(
    () => (!pc ? "" : pc.pc_data.constitutionSave)
  );
  const [
    characterConstitutionSaveChecked,
    setCharacterConstitutionSaveChecked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterConstitutionSaveChecked));
  const [characterIntelligence, setCharacterIntelligence] = useState(() =>
    !pc ? "" : pc.pc_data.intelligence
  );
  const [characterIntelligenceModifier, setCharacterIntelligenceModifier] =
    useState(() => (!pc ? "" : pc.pc_data.intelligenceModifier));
  const [characterIntelligenceSave, setCharacterIntelligenceSave] = useState(
    () => (!pc ? "" : pc.pc_data.intelligenceSave)
  );
  const [
    characterIntelligenceSaveChecked,
    setCharacterIntelligenceSaveChecked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterIntelligenceSaveChecked));
  const [characterWisdom, setCharacterWisdom] = useState(() =>
    !pc ? "" : pc.pc_data.wisdom
  );
  const [characterWisdomModifier, setCharacterWisdomModifier] = useState(() =>
    !pc ? "" : pc.pc_data.wisdomModifier
  );
  const [characterWisdomSave, setCharacterWisdomSave] = useState(() =>
    !pc ? "" : pc.pc_data.wisdomSave
  );
  const [characterWisdomSaveChecked, setCharacterWisdomSaveChecked] = useState(
    () => (!pc ? "" : pc.pc_data.characterWisdomSaveChecked)
  );
  const [characterCharisma, setCharacterCharisma] = useState(() =>
    !pc ? "" : pc.pc_data.charisma
  );
  const [characterCharismaModifier, setCharacterCharismaModifier] = useState(
    () => (!pc ? "" : pc.pc_data.charismaModifier)
  );
  const [characterCharismaSave, setCharacterCharismaSave] = useState(() =>
    !pc ? "" : pc.pc_data.charismaSave
  );
  const [characterCharismaSaveChecked, setCharacterCharismaSaveChecked] =
    useState(() => (!pc ? "" : pc.pc_data.characterCharismaSaveChecked));
  const [characterAcrobatics, setCharacterAcrobatics] = useState(() =>
    !pc ? "" : pc.pc_data.acrobatics
  );
  const [characterAcrobaticsChecked, setCharacterAcrobaticsChecked] = useState(
    () => (!pc ? "" : pc.pc_data.characterAcrobaticsChecked)
  );
  const [characterAnimalHandling, setCharacterAnimalHandling] = useState(() =>
    !pc ? "" : pc.pc_data.animalHandling
  );
  const [characterAnimalHandlingChecked, setCharacterAnimalHandlingChecked] =
    useState(() => (!pc ? "" : pc.pc_data.characterAnimalHandlingChecked));
  const [characterArcana, setCharacterArcana] = useState(() =>
    !pc ? "" : pc.pc_data.arcana
  );
  const [characterArcanaChecked, setCharacterArcanaChecked] = useState(() =>
    !pc ? "" : pc.pc_data.characterArcanaChecked
  );
  const [characterAthletics, setCharacterAthletics] = useState(() =>
    !pc ? "" : pc.pc_data.athletics
  );
  const [characterAthleticsChecked, setCharacterAthleticsChecked] = useState(
    () => (!pc ? "" : pc.pc_data.characterAthleticsChecked)
  );
  const [characterDeception, setCharacterDeception] = useState(() =>
    !pc ? "" : pc.pc_data.deception
  );
  const [characterDeceptionChecked, setCharacterDeceptionChecked] = useState(
    () => (!pc ? "" : pc.pc_data.characterDeceptionChecked)
  );
  const [characterHistory, setCharacterHistory] = useState(() =>
    !pc ? "" : pc.pc_data.history
  );
  const [characterHistoryChecked, setCharacterHistoryChecked] = useState(() =>
    !pc ? "" : pc.pc_data.characterHistoryChecked
  );
  const [characterInsight, setCharacterInsight] = useState(() =>
    !pc ? "" : pc.pc_data.insight
  );
  const [characterInsightChecked, setCharacterInsightChecked] = useState(() =>
    !pc ? "" : pc.pc_data.characterInsightChecked
  );
  const [characterIntimidation, setCharacterIntimidation] = useState(() =>
    !pc ? "" : pc.pc_data.intimidation
  );
  const [characterIntimidationChecked, setCharacterIntimidationChecked] =
    useState(() => (!pc ? "" : pc.pc_data.characterIntimidationChecked));
  const [characterInvestigation, setCharacterInvestigation] = useState(() =>
    !pc ? "" : pc.pc_data.investigation
  );
  const [characterInvestigationChecked, setCharacterInvestigationChecked] =
    useState(() => (!pc ? "" : pc.pc_data.characterInvestigationChecked));
  const [characterMedicine, setCharacterMedicine] = useState(() =>
    !pc ? "" : pc.pc_data.medicine
  );
  const [characterMedicineChecked, setCharacterMedicineChecked] = useState(() =>
    !pc ? "" : pc.pc_data.characterMedicineChecked
  );
  const [characterNature, setCharacterNature] = useState(() =>
    !pc ? "" : pc.pc_data.nature
  );
  const [characterNatureChecked, setCharacterNatureChecked] = useState(() =>
    !pc ? "" : pc.pc_data.characterNatureChecked
  );
  const [characterPerception, setCharacterPerception] = useState(() =>
    !pc ? "" : pc.pc_data.perception
  );
  const [characterPerceptionChecked, setCharacterPerceptionChecked] = useState(
    () => (!pc ? "" : pc.pc_data.characterPerceptionChecked)
  );
  const [characterPerformance, setCharacterPerformance] = useState(() =>
    !pc ? "" : pc.pc_data.performance
  );
  const [characterPerformanceChecked, setCharacterPerformanceChecked] =
    useState(() => (!pc ? "" : pc.pc_data.characterPerformanceChecked));
  const [characterPersuasion, setCharacterPersuasion] = useState(() =>
    !pc ? "" : pc.pc_data.persuasion
  );
  const [characterPersuasionChecked, setCharacterPersuasionChecked] = useState(
    () => (!pc ? "" : pc.pc_data.characterPersuasionChecked)
  );
  const [characterReligion, setCharacterReligion] = useState(() =>
    !pc ? "" : pc.pc_data.religion
  );
  const [characterReligionChecked, setCharacterReligionChecked] = useState(() =>
    !pc ? "" : pc.pc_data.characterReligionChecked
  );
  const [characterSleightOfHand, setCharacterSleightOfHand] = useState(() =>
    !pc ? "" : pc.pc_data.sleightOfHand
  );
  const [characterSleightOfHandChecked, setCharacterSleightOfHandChecked] =
    useState(() => (!pc ? "" : pc.pc_data.sleightOfHandChecked));
  const [characterStealth, setCharacterStealth] = useState(() =>
    !pc ? "" : pc.pc_data.stealth
  );
  const [characterStealthChecked, setCharacterStealthChecked] = useState(() =>
    !pc ? "" : pc.pc_data.stealthChecked
  );
  const [characterSurvival, setCharacterSurvival] = useState(() =>
    !pc ? "" : pc.pc_data.survival
  );
  const [characterSurvivalChecked, setCharacterSurvivalChecked] = useState(() =>
    !pc ? "" : pc.pc_data.survivalChecked
  );
  const [characterPassiveWisdom, setCharacterPassiveWisdom] = useState(() =>
    !pc ? "" : pc.pc_data.passiveWisdom
  );
  const [characterMaxHP, setCharacterMaxHP] = useState(() =>
    !pc ? "" : pc.pc_data.maxHP
  );
  const [characterCurrentHP, setCharacterCurrentHP] = useState(() =>
    !pc ? "" : pc.pc_data.currentHP
  );
  const [characterTempHP, setCharacterTempHP] = useState(() =>
    !pc ? "" : pc.pc_data.tempHP
  );
  const [characterAC, setCharacterAC] = useState(() =>
    !pc ? "" : pc.pc_data.ac
  );
  const [characterInitiative, setCharacterInitiative] = useState(() =>
    !pc ? "" : pc.pc_data.initiative
  );
  const [characterSpeed, setCharacterSpeed] = useState(() =>
    !pc ? "" : pc.pc_data.speed
  );
  const [characterHitDice1, setCharacterHitDice1] = useState(() =>
    !pc ? "" : pc.pc_data.hitDice1
  );
  const [characterHitDice2, setCharacterHitDice2] = useState(() =>
    !pc ? "" : pc.pc_data.hitDice2
  );
  const [characterAttName1, setCharacterAttName1] = useState(() =>
    !pc ? "" : pc.pc_data.attName1
  );
  const [characterAttBonus1, setCharacterAttBonus1] = useState(() =>
    !pc ? "" : pc.pc_data.attBonus1
  );
  const [characterAttDamage1, setCharacterAttDamage1] = useState(() =>
    !pc ? "" : pc.pc_data.attDamage1
  );
  const [characterAttName2, setCharacterAttName2] = useState(() =>
    !pc ? "" : pc.pc_data.attName2
  );
  const [characterAttBonus2, setCharacterAttBonus2] = useState(() =>
    !pc ? "" : pc.pc_data.attBonus2
  );
  const [characterAttDamage2, setCharacterAttDamage2] = useState(() =>
    !pc ? "" : pc.pc_data.attDamage2
  );
  const [characterAttName3, setCharacterAttName3] = useState(() =>
    !pc ? "" : pc.pc_data.attName3
  );
  const [characterAttBonus3, setCharacterAttBonus3] = useState(() =>
    !pc ? "" : pc.pc_data.attBonus3
  );
  const [characterAttDamage3, setCharacterAttDamage3] = useState(() =>
    !pc ? "" : pc.pc_data.attDamage3
  );
  const [
    characterAttackAndSpellsTextArea,
    setCharacterAttackAndSpellsTextArea,
  ] = useState(() => (!pc ? "" : pc.pc_data.attackAndSpellsTextArea));
  const [characterEquipment, setCharacterEquipment] = useState(() =>
    !pc ? "" : pc.pc_data.equipment
  );
  const [
    characterProficienciesAndLanguages,
    setCharacterProficienciesAndLanguages,
  ] = useState(() => (!pc ? "" : pc.pc_data.proficienciesAndLanguages));
  const [characterPersonalityTraits, setCharacterPersonalityTraits] = useState(
    () => (!pc ? "" : pc.pc_data.personalityTraits)
  );
  const [characterIdeals, setCharacterIdeals] = useState(() =>
    !pc ? "" : pc.pc_data.ideals
  );
  const [characterBonds, setCharacterBonds] = useState(() =>
    !pc ? "" : pc.pc_data.bonds
  );
  const [characterFlaws, setCharacterFlaws] = useState(() =>
    !pc ? "" : pc.pc_data.flaws
  );
  const [characterFeaturesAndTraits, setCharacterFeaturesAndTraits] = useState(
    () => (!pc ? "" : pc.pc_data.featuresAndTraits)
  );
  const [characterAge, setCharacterAge] = useState(() =>
    !pc ? "" : pc.pc_data.age
  );
  const [characterHeight, setCharacterHeight] = useState(() =>
    !pc ? "" : pc.pc_data.height
  );
  const [characterWeight, setCharacterWeight] = useState(() =>
    !pc ? "" : pc.pc_data.weight
  );
  const [characterEyes, setCharacterEyes] = useState(() =>
    !pc ? "" : pc.pc_data.eyes
  );
  const [characterSkin, setCharacterSkin] = useState(() =>
    !pc ? "" : pc.pc_data.skin
  );
  const [characterHair, setCharacterHair] = useState(() =>
    !pc ? "" : pc.pc_data.hair
  );
  const [characterAlliesAndOrganizations, setCharacterAlliesAndOrganizations] =
    useState(() => (!pc ? "" : pc.pc_data.alliesAndOrganizations));
  const [
    characterAdditionalFeaturesAndTraits,
    setCharacterAdditionalFeaturesAndTraits,
  ] = useState(() => (!pc ? "" : pc.pc_data.additionalFeaturesAndTraits));
  const [characterTreasures, setCharacterTreasures] = useState(() =>
    !pc ? "" : pc.pc_data.treasures
  );
  const [characterSpellAbility, setCharacterSpellAbility] = useState(() =>
    !pc ? "" : pc.pc_data.spellAbility
  );
  const [characterSpellSaveDC, setCharacterSpellSaveDC] = useState(() =>
    !pc ? "" : pc.pc_data.spellSaveDC
  );
  const [characterSpellAttackBonus, setCharacterSpellAttackBonus] = useState(
    () => (!pc ? "" : pc.pc_data.spellAttBonus)
  );
  const [characterCantripNumber, setCharacterCantripNumber] = useState(() =>
    !pc ? "" : pc.pc_data.cantripNumber
  );
  const [characterCantrip1, setCharacterCantrip1] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip1
  );
  const [characterCantrip1Checked, setCharacterCantrip1Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip1Checked
  );
  const [characterCantrip2, setCharacterCantrip2] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip2
  );
  const [characterCantrip2Checked, setCharacterCantrip2Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip2Checked
  );
  const [characterCantrip3, setCharacterCantrip3] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip3
  );
  const [characterCantrip3Checked, setCharacterCantrip3Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip3Checked
  );
  const [characterCantrip4, setCharacterCantrip4] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip4
  );
  const [characterCantrip4Checked, setCharacterCantrip4Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip4Checked
  );
  const [characterCantrip5, setCharacterCantrip5] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip5
  );
  const [characterCantrip5Checked, setCharacterCantrip5Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip5Checked
  );
  const [characterCantrip6, setCharacterCantrip6] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip6
  );
  const [characterCantrip6Checked, setCharacterCantrip6Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip6Checked
  );
  const [characterCantrip7, setCharacterCantrip7] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip7
  );
  const [characterCantrip7Checked, setCharacterCantrip7Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip7Checked
  );
  const [characterCantrip8, setCharacterCantrip8] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip8
  );
  const [characterCantrip8Checked, setCharacterCantrip8Checked] = useState(() =>
    !pc ? "" : pc.pc_data.cantrip8Checked
  );
  const [spellLevel1Total, setSpellLevel1Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel1Total
  );
  const [spellLevel1Used, setSpellLevel1Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel1Used
  );
  const [characterSpellLevel1Spell1, setCharacterSpellLevel1Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell1)
  );
  const [
    characterSpellLevel1Spell1Checked,
    setCharacterSpellLevel1Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell1Checked));
  const [characterSpellLevel1Spell2, setCharacterSpellLevel1Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell2)
  );
  const [
    characterSpellLevel1Spell2Checked,
    setCharacterSpellLevel1Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell2Checked));
  const [characterSpellLevel1Spell3, setCharacterSpellLevel1Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell3)
  );
  const [
    characterSpellLevel1Spell3Checked,
    setCharacterSpellLevel1Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell3Checked));
  const [characterSpellLevel1Spell4, setCharacterSpellLevel1Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell4)
  );
  const [
    characterSpellLevel1Spell4Checked,
    setCharacterSpellLevel1Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell4Checked));
  const [characterSpellLevel1Spell5, setCharacterSpellLevel1Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell5)
  );
  const [
    characterSpellLevel1Spell5Checked,
    setCharacterSpellLevel1Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell5Checked));
  const [characterSpellLevel1Spell6, setCharacterSpellLevel1Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell6)
  );
  const [
    characterSpellLevel1Spell6Checked,
    setCharacterSpellLevel1Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell6Checked));
  const [characterSpellLevel1Spell7, setCharacterSpellLevel1Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell7)
  );
  const [
    characterSpellLevel1Spell7Checked,
    setCharacterSpellLevel1Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell7Checked));
  const [characterSpellLevel1Spell8, setCharacterSpellLevel1Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell8)
  );
  const [
    characterSpellLevel1Spell8Checked,
    setCharacterSpellLevel1Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell8Checked));
  const [characterSpellLevel1Spell9, setCharacterSpellLevel1Spell9] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel1Spell9)
  );
  const [
    characterSpellLevel1Spell9Checked,
    setCharacterSpellLevel1Spell9Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel1Spell9Checked));
  const [characterSpellLevel1Spell10, setCharacterSpellLevel1Spell10] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel1Spell10));
  const [
    characterSpellLevel1Spell10Checked,
    setCharacterSpellLevel1Spell10Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel1Spell10Checked
  );
  const [characterSpellLevel1Spell11, setCharacterSpellLevel1Spell11] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel1Spell11));
  const [
    characterSpellLevel1Spell11Checked,
    setCharacterSpellLevel1Spell11Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel1Spell11Checked
  );
  const [characterSpellLevel1Spell12, setCharacterSpellLevel1Spell12] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel1Spell12));
  const [
    characterSpellLevel1Spell12Checked,
    setCharacterSpellLevel1Spell12Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel1Spell12Checked
  );
  const [characterSpellLevel1Spell13, setCharacterSpellLevel1Spell13] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel1Spell13));
  const [
    characterSpellLevel1Spell13Checked,
    setCharacterSpellLevel1Spell13Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel1Spell13Checked
  );
  const [spellLevel2Total, setSpellLevel2Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel2Total
  );
  const [spellLevel2Used, setSpellLevel2Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel2Used
  );
  const [characterSpellLevel2Spell1, setCharacterSpellLevel2Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell1)
  );
  const [
    characterSpellLevel2Spell1Checked,
    setCharacterSpellLevel2Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell1Checked));
  const [characterSpellLevel2Spell2, setCharacterSpellLevel2Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell2)
  );
  const [
    characterSpellLevel2Spell2Checked,
    setCharacterSpellLevel2Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell2Checked));
  const [characterSpellLevel2Spell3, setCharacterSpellLevel2Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell3)
  );
  const [
    characterSpellLevel2Spell3Checked,
    setCharacterSpellLevel2Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell3Checked));
  const [characterSpellLevel2Spell4, setCharacterSpellLevel2Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell4)
  );
  const [
    characterSpellLevel2Spell4Checked,
    setCharacterSpellLevel2Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell4Checked));
  const [characterSpellLevel2Spell5, setCharacterSpellLevel2Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell5)
  );
  const [
    characterSpellLevel2Spell5Checked,
    setCharacterSpellLevel2Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell5Checked));
  const [characterSpellLevel2Spell6, setCharacterSpellLevel2Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell6)
  );
  const [
    characterSpellLevel2Spell6Checked,
    setCharacterSpellLevel2Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell6Checked));
  const [characterSpellLevel2Spell7, setCharacterSpellLevel2Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell7)
  );
  const [
    characterSpellLevel2Spell7Checked,
    setCharacterSpellLevel2Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell7Checked));
  const [characterSpellLevel2Spell8, setCharacterSpellLevel2Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell8)
  );
  const [
    characterSpellLevel2Spell8Checked,
    setCharacterSpellLevel2Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell8Checked));
  const [characterSpellLevel2Spell9, setCharacterSpellLevel2Spell9] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel2Spell9)
  );
  const [
    characterSpellLevel2Spell9Checked,
    setCharacterSpellLevel2Spell9Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel2Spell9Checked));
  const [characterSpellLevel2Spell10, setCharacterSpellLevel2Spell10] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel2Spell10));
  const [
    characterSpellLevel2Spell10Checked,
    setCharacterSpellLevel2Spell10Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel2Spell10Checked
  );
  const [characterSpellLevel2Spell11, setCharacterSpellLevel2Spell11] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel2Spell11));
  const [
    characterSpellLevel2Spell11Checked,
    setCharacterSpellLevel2Spell11Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel2Spell11Checked
  );
  const [characterSpellLevel2Spell12, setCharacterSpellLevel2Spell12] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel2Spell12));
  const [
    characterSpellLevel2Spell12Checked,
    setCharacterSpellLevel2Spell12Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel2Spell12Checked
  );
  const [characterSpellLevel2Spell13, setCharacterSpellLevel2Spell13] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel2Spell13));
  const [
    characterSpellLevel2Spell13Checked,
    setCharacterSpellLevel2Spell13Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel2Spell13Checked
  );
  const [spellLevel3Total, setSpellLevel3Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel3Total
  );
  const [spellLevel3Used, setSpellLevel3Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel3Used
  );
  const [characterSpellLevel3Spell1, setCharacterSpellLevel3Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell1)
  );
  const [
    characterSpellLevel3Spell1Checked,
    setCharacterSpellLevel3Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell1Checked));
  const [characterSpellLevel3Spell2, setCharacterSpellLevel3Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell2)
  );
  const [
    characterSpellLevel3Spell2Checked,
    setCharacterSpellLevel3Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell2Checked));
  const [characterSpellLevel3Spell3, setCharacterSpellLevel3Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell3)
  );
  const [
    characterSpellLevel3Spell3Checked,
    setCharacterSpellLevel3Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell3Checked));
  const [characterSpellLevel3Spell4, setCharacterSpellLevel3Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell4)
  );
  const [
    characterSpellLevel3Spell4Checked,
    setCharacterSpellLevel3Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell4Checked));
  const [characterSpellLevel3Spell5, setCharacterSpellLevel3Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell5)
  );
  const [
    characterSpellLevel3Spell5Checked,
    setCharacterSpellLevel3Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell5Checked));
  const [characterSpellLevel3Spell6, setCharacterSpellLevel3Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell6)
  );
  const [
    characterSpellLevel3Spell6Checked,
    setCharacterSpellLevel3Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell6Checked));
  const [characterSpellLevel3Spell7, setCharacterSpellLevel3Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell7)
  );
  const [
    characterSpellLevel3Spell7Checked,
    setCharacterSpellLevel3Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell7Checked));
  const [characterSpellLevel3Spell8, setCharacterSpellLevel3Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell8)
  );
  const [
    characterSpellLevel3Spell8Checked,
    setCharacterSpellLevel3Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell8Checked));
  const [characterSpellLevel3Spell9, setCharacterSpellLevel3Spell9] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel3Spell9)
  );
  const [
    characterSpellLevel3Spell9Checked,
    setCharacterSpellLevel3Spell9Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel3Spell9Checked));
  const [characterSpellLevel3Spell10, setCharacterSpellLevel3Spell10] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel3Spell10));
  const [
    characterSpellLevel3Spell10Checked,
    setCharacterSpellLevel3Spell10Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel3Spell10Checked
  );
  const [characterSpellLevel3Spell11, setCharacterSpellLevel3Spell11] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel3Spell11));
  const [
    characterSpellLevel3Spell11Checked,
    setCharacterSpellLevel3Spell11Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel3Spell11Checked
  );
  const [characterSpellLevel3Spell12, setCharacterSpellLevel3Spell12] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel3Spell12));
  const [
    characterSpellLevel3Spell12Checked,
    setCharacterSpellLevel3Spell12Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel3Spell12Checked
  );
  const [characterSpellLevel3Spell13, setCharacterSpellLevel3Spell13] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel3Spell13));
  const [
    characterSpellLevel3Spell13Checked,
    setCharacterSpellLevel3Spell13Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel3Spell13Checked
  );
  const [spellLevel4Total, setSpellLevel4Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel4Total
  );
  const [spellLevel4Used, setSpellLevel4Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel4Used
  );
  const [characterSpellLevel4Spell1, setCharacterSpellLevel4Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell1)
  );
  const [
    characterSpellLevel4Spell1Checked,
    setCharacterSpellLevel4Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell1Checked));
  const [characterSpellLevel4Spell2, setCharacterSpellLevel4Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell2)
  );
  const [
    characterSpellLevel4Spell2Checked,
    setCharacterSpellLevel4Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell2Checked));
  const [characterSpellLevel4Spell3, setCharacterSpellLevel4Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell3)
  );
  const [
    characterSpellLevel4Spell3Checked,
    setCharacterSpellLevel4Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell3Checked));
  const [characterSpellLevel4Spell4, setCharacterSpellLevel4Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell4)
  );
  const [
    characterSpellLevel4Spell4Checked,
    setCharacterSpellLevel4Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell4Checked));
  const [characterSpellLevel4Spell5, setCharacterSpellLevel4Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell5)
  );
  const [
    characterSpellLevel4Spell5Checked,
    setCharacterSpellLevel4Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell5Checked));
  const [characterSpellLevel4Spell6, setCharacterSpellLevel4Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell6)
  );
  const [
    characterSpellLevel4Spell6Checked,
    setCharacterSpellLevel4Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell6Checked));
  const [characterSpellLevel4Spell7, setCharacterSpellLevel4Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell7)
  );
  const [
    characterSpellLevel4Spell7Checked,
    setCharacterSpellLevel4Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell7Checked));
  const [characterSpellLevel4Spell8, setCharacterSpellLevel4Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell8)
  );
  const [
    characterSpellLevel4Spell8Checked,
    setCharacterSpellLevel4Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell8Checked));
  const [characterSpellLevel4Spell9, setCharacterSpellLevel4Spell9] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel4Spell9)
  );
  const [
    characterSpellLevel4Spell9Checked,
    setCharacterSpellLevel4Spell9Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel4Spell9Checked));
  const [characterSpellLevel4Spell10, setCharacterSpellLevel4Spell10] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel4Spell10));
  const [
    characterSpellLevel4Spell10Checked,
    setCharacterSpellLevel4Spell10Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel4Spell10Checked
  );
  const [characterSpellLevel4Spell11, setCharacterSpellLevel4Spell11] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel4Spell11));
  const [
    characterSpellLevel4Spell11Checked,
    setCharacterSpellLevel4Spell11Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel4Spell11Checked
  );
  const [characterSpellLevel4Spell12, setCharacterSpellLevel4Spell12] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel4Spell12));
  const [
    characterSpellLevel4Spell12Checked,
    setCharacterSpellLevel4Spell12Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel4Spell12Checked
  );
  const [characterSpellLevel4Spell13, setCharacterSpellLevel4Spell13] =
    useState(() => (!pc ? "" : pc.pc_data.spellLevel4Spell13));
  const [
    characterSpellLevel4Spell13Checked,
    setCharacterSpellLevel4Spell13Checked,
  ] = useState(() =>
    !pc ? "" : pc.pc_data.characterSpellLevel4Spell13Checked
  );
  const [spellLevel5Total, setSpellLevel5Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel5Total
  );
  const [spellLevel5Used, setSpellLevel5Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel5Used
  );
  const [characterSpellLevel5Spell1, setCharacterSpellLevel5Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell1)
  );
  const [
    characterSpellLevel5Spell1Checked,
    setCharacterSpellLevel5Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell1Checked));
  const [characterSpellLevel5Spell2, setCharacterSpellLevel5Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell2)
  );
  const [
    characterSpellLevel5Spell2Checked,
    setCharacterSpellLevel5Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell2Checked));
  const [characterSpellLevel5Spell3, setCharacterSpellLevel5Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell3)
  );
  const [
    characterSpellLevel5Spell3Checked,
    setCharacterSpellLevel5Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell3Checked));
  const [characterSpellLevel5Spell4, setCharacterSpellLevel5Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell4)
  );
  const [
    characterSpellLevel5Spell4Checked,
    setCharacterSpellLevel5Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell4Checked));
  const [characterSpellLevel5Spell5, setCharacterSpellLevel5Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell5)
  );
  const [
    characterSpellLevel5Spell5Checked,
    setCharacterSpellLevel5Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell5Checked));
  const [characterSpellLevel5Spell6, setCharacterSpellLevel5Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell6)
  );
  const [
    characterSpellLevel5Spell6Checked,
    setCharacterSpellLevel5Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell6Checked));
  const [characterSpellLevel5Spell7, setCharacterSpellLevel5Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell7)
  );
  const [
    characterSpellLevel5Spell7Checked,
    setCharacterSpellLevel5Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell7Checked));
  const [characterSpellLevel5Spell8, setCharacterSpellLevel5Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel5Spell8)
  );
  const [
    characterSpellLevel5Spell8Checked,
    setCharacterSpellLevel5Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel5Spell8Checked));
  const [spellLevel6Total, setSpellLevel6Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel6Total
  );
  const [spellLevel6Used, setSpellLevel6Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel6Used
  );
  const [characterSpellLevel6Spell1, setCharacterSpellLevel6Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell1)
  );
  const [
    characterSpellLevel6Spell1Checked,
    setCharacterSpellLevel6Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell1Checked));
  const [characterSpellLevel6Spell2, setCharacterSpellLevel6Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell2)
  );
  const [
    characterSpellLevel6Spell2Checked,
    setCharacterSpellLevel6Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell2Checked));
  const [characterSpellLevel6Spell3, setCharacterSpellLevel6Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell3)
  );
  const [
    characterSpellLevel6Spell3Checked,
    setCharacterSpellLevel6Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell3Checked));
  const [characterSpellLevel6Spell4, setCharacterSpellLevel6Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell4)
  );
  const [
    characterSpellLevel6Spell4Checked,
    setCharacterSpellLevel6Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell4Checked));
  const [characterSpellLevel6Spell5, setCharacterSpellLevel6Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell5)
  );
  const [
    characterSpellLevel6Spell5Checked,
    setCharacterSpellLevel6Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell5Checked));
  const [characterSpellLevel6Spell6, setCharacterSpellLevel6Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell6)
  );
  const [
    characterSpellLevel6Spell6Checked,
    setCharacterSpellLevel6Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell6Checked));
  const [characterSpellLevel6Spell7, setCharacterSpellLevel6Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell7)
  );
  const [
    characterSpellLevel6Spell7Checked,
    setCharacterSpellLevel6Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell7Checked));
  const [characterSpellLevel6Spell8, setCharacterSpellLevel6Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel6Spell8)
  );
  const [
    characterSpellLevel6Spell8Checked,
    setCharacterSpellLevel6Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel6Spell8Checked));
  const [spellLevel7Total, setSpellLevel7Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel7Total
  );
  const [spellLevel7Used, setSpellLevel7Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel7Used
  );
  const [characterSpellLevel7Spell1, setCharacterSpellLevel7Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell1)
  );
  const [
    characterSpellLevel7Spell1Checked,
    setCharacterSpellLevel7Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell1Checked));
  const [characterSpellLevel7Spell2, setCharacterSpellLevel7Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell2)
  );
  const [
    characterSpellLevel7Spell2Checked,
    setCharacterSpellLevel7Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell2Checked));
  const [characterSpellLevel7Spell3, setCharacterSpellLevel7Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell3)
  );
  const [
    characterSpellLevel7Spell3Checked,
    setCharacterSpellLevel7Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell3Checked));
  const [characterSpellLevel7Spell4, setCharacterSpellLevel7Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell4)
  );
  const [
    characterSpellLevel7Spell4Checked,
    setCharacterSpellLevel7Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell4Checked));
  const [characterSpellLevel7Spell5, setCharacterSpellLevel7Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell5)
  );
  const [
    characterSpellLevel7Spell5Checked,
    setCharacterSpellLevel7Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell5Checked));
  const [characterSpellLevel7Spell6, setCharacterSpellLevel7Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell6)
  );
  const [
    characterSpellLevel7Spell6Checked,
    setCharacterSpellLevel7Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell6Checked));
  const [characterSpellLevel7Spell7, setCharacterSpellLevel7Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell7)
  );
  const [
    characterSpellLevel7Spell7Checked,
    setCharacterSpellLevel7Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell7Checked));
  const [characterSpellLevel7Spell8, setCharacterSpellLevel7Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel7Spell8)
  );
  const [
    characterSpellLevel7Spell8Checked,
    setCharacterSpellLevel7Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel7Spell8Checked));
  const [spellLevel8Total, setSpellLevel8Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel8Total
  );
  const [spellLevel8Used, setSpellLevel8Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel8Used
  );
  const [characterSpellLevel8Spell1, setCharacterSpellLevel8Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell1)
  );
  const [
    characterSpellLevel8Spell1Checked,
    setCharacterSpellLevel8Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell1Checked));
  const [characterSpellLevel8Spell2, setCharacterSpellLevel8Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell2)
  );
  const [
    characterSpellLevel8Spell2Checked,
    setCharacterSpellLevel8Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell2Checked));
  const [characterSpellLevel8Spell3, setCharacterSpellLevel8Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell3)
  );
  const [
    characterSpellLevel8Spell3Checked,
    setCharacterSpellLevel8Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell3Checked));
  const [characterSpellLevel8Spell4, setCharacterSpellLevel8Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell4)
  );
  const [
    characterSpellLevel8Spell4Checked,
    setCharacterSpellLevel8Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell4Checked));
  const [characterSpellLevel8Spell5, setCharacterSpellLevel8Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell5)
  );
  const [
    characterSpellLevel8Spell5Checked,
    setCharacterSpellLevel8Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell5Checked));
  const [characterSpellLevel8Spell6, setCharacterSpellLevel8Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell6)
  );
  const [
    characterSpellLevel8Spell6Checked,
    setCharacterSpellLevel8Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell6Checked));
  const [characterSpellLevel8Spell7, setCharacterSpellLevel8Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell7)
  );
  const [
    characterSpellLevel8Spell7Checked,
    setCharacterSpellLevel8Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell7Checked));
  const [characterSpellLevel8Spell8, setCharacterSpellLevel8Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel8Spell8)
  );
  const [
    characterSpellLevel8Spell8Checked,
    setCharacterSpellLevel8Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel8Spell8Checked));
  const [spellLevel9Total, setSpellLevel9Total] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel9Total
  );
  const [spellLevel9Used, setSpellLevel9Used] = useState(() =>
    !pc ? "" : pc.pc_data.spellLevel9Used
  );
  const [characterSpellLevel9Spell1, setCharacterSpellLevel9Spell1] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell1)
  );
  const [
    characterSpellLevel9Spell1Checked,
    setCharacterSpellLevel9Spell1Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell1Checked));
  const [characterSpellLevel9Spell2, setCharacterSpellLevel9Spell2] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell2)
  );
  const [
    characterSpellLevel9Spell2Checked,
    setCharacterSpellLevel9Spell2Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell2Checked));
  const [characterSpellLevel9Spell3, setCharacterSpellLevel9Spell3] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell3)
  );
  const [
    characterSpellLevel9Spell3Checked,
    setCharacterSpellLevel9Spell3Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell3Checked));
  const [characterSpellLevel9Spell4, setCharacterSpellLevel9Spell4] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell4)
  );
  const [
    characterSpellLevel9Spell4Checked,
    setCharacterSpellLevel9Spell4Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell4Checked));
  const [characterSpellLevel9Spell5, setCharacterSpellLevel9Spell5] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell5)
  );
  const [
    characterSpellLevel9Spell5Checked,
    setCharacterSpellLevel9Spell5Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell5Checked));
  const [characterSpellLevel9Spell6, setCharacterSpellLevel9Spell6] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell6)
  );
  const [
    characterSpellLevel9Spell6Checked,
    setCharacterSpellLevel9Spell6Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell6Checked));
  const [characterSpellLevel9Spell7, setCharacterSpellLevel9Spell7] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell7)
  );
  const [
    characterSpellLevel9Spell7Checked,
    setCharacterSpellLevel9Spell7Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell7Checked));
  const [characterSpellLevel9Spell8, setCharacterSpellLevel9Spell8] = useState(
    () => (!pc ? "" : pc.pc_data.spellLevel9Spell8)
  );
  const [
    characterSpellLevel9Spell8Checked,
    setCharacterSpellLevel9Spell8Checked,
  ] = useState(() => (!pc ? "" : pc.pc_data.characterSpellLevel9Spell8Checked));
  const [characterImage, setCharacterImage] = useState(undefined);
  const [bucketImage, setBucketImage] = useState(
    !pc ? "" : pc.pc_data.characterImage
  );
  const [savedPcs, setSavedPcs] = useState([]);
  const [pcId, setPcId] = useState(() => (!pc ? "" : pc.pc_id));

  const formToJSON = (elements) =>
    [].reduce.call(
      elements,
      (data, element) => {
        data[element.name] = element.value;
        return data;
      },
      {}
    );

  useEffect(() => {
    const setImageValue = () => {
      const { data: bucketImage, error: bucketError } = supabase.storage
        .from("dnd_images")
        .getPublicUrl(
          `character_images/${user?.id}/${characterName}/character_image.png`
        );

      setBucketImage(bucketImage.publicUrl.toString());
    };
    setImageValue();
  }, [user, supabase, characterName]);

  const pcCharacters = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "pc_characters" },
      (payload) => {
        console.log("Change received!", payload);
      }
    )
    .subscribe();

  const handleSavePc = async (e) => {
    e.preventDefault();
    const data = formToJSON(ref.current);

    const fetchPcs = async () => {
      if (user) {
        const { data: pcs, error } = await supabase
          .from("pc_characters")
          .select("*")
          .eq("id", user.id);
        const pcArray = [];
        pcs.map((pc) => {
          pcArray.push(pc.pc_name);
        });
        setSavedPcs(pcArray);
      }
    };

    fetchPcs();

    if (savedPcs.includes(characterName)) {
      return alert(
        "You already have a character with that name. Please choose a different name."
      );
    } else {
      const { error } = await supabase
        .from("pc_characters")
        .insert({ id: user.id, pc_name: characterName, pc_data: data });

      const { data: newPc, error: newPcError } = await supabase
        .from("pc_characters")
        .select("*")
        .eq("pc_name", characterName)
        .eq("id", user.id);

      setPcId(newPc[0].pc_id);

      const { data: image, error: imgError } = await supabase.storage
        .from("dnd_images")
        .upload(
          `character_images/${user.id}/${characterName}/character_image.png`,
          decode(b64),
          {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/png",
          }
        );

      toast.success(`${characterName} saved!`);
    }
  };

  const handleUpdatePc = async (e) => {
    e.preventDefault();
    const data = formToJSON(ref.current);
    const { error } = await supabase
      .from("pc_characters")
      .update({ pc_data: data })
      .eq("pc_id", pcId);
    toast.success(`${characterName} updated!`);
  };

  const handleDeletePc = async (id) => {
    const { data, error } = await supabase
      .from("pc_characters")
      .delete()
      .eq("pc_id", pc_id);

    setPcId("");

    toast.success(`${name} Deleted!`, {
      duration: 8000,
    });
  };

  let name = !pc ? nameValue : pc.pc_name;

  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className="grid grid-cols-1">
        {pc_id && (
          <div className="grid grid-cols-1 place-self-center p-2 space-y-4">
            <h1 className="text-4xl text-center mb-4">{name}</h1>
            <div className="grid gap-4 place-self-center pb-6">
              <div className="grid md:flex gap-4 justify-center place-items-center">
                <button
                  className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500 self-center"
                  id="delete"
                  onClick={(e) => handleDeletePc(pc_id)}
                >
                  Delete PC
                </button>
              </div>
            </div>
            <Image
              src={bucketImage}
              alt="DALL-E image of dnd character"
              name="characterImage"
              width={400}
              height={400}
              className="border-2 border-black rounded-md w-full"
            />
            <div
              className="hidden"
              name="characterImage"
              value={characterImage}
            />
          </div>
        )}
      </div>

      {/* For Desktop */}
      <form
        ref={ref}
        className="hidden sm:block container p-4 space-y-6 w-full"
      >
        <div className="flex justify-center space-x-4">
          <h1 className="text-4xl font-bold">Character Sheet</h1>
          {!user ? (
            <button
              className="bg-defaultButton p-2 rounded-md hover:bg-gray-500"
              disabled
            >
              <p>Login to Save PCs</p>
            </button>
          ) : (
            <button
              onClick={!pcId ? handleSavePc : handleUpdatePc}
              type="submit"
              className="bg-defaultButton p-2 rounded-md hover:bg-gray-500"
            >
              {!pcId ? (
                <p>Save Character Sheet</p>
              ) : (
                <p>Update Character Sheet</p>
              )}
            </button>
          )}
        </div>
        {/* Sheet One */}
        <main className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-md p-4 w-full">
            <div className="grid grid-cols-1 border-2">
              <div className="grid grid-cols-3">
                <div>
                  <p className="text-center">Character Name</p>
                  <input
                    type="text"
                    placeholder="Name"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    name="name"
                    className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                  />
                </div>
                <div className="grid col-span-2 grid-cols-3">
                  <div>
                    <p className="text-center">Class</p>
                    <input
                      type="text"
                      placeholder="Class"
                      value={characterCharacterClass}
                      onChange={(e) =>
                        setCharacterCharacterClass(e.target.value)
                      }
                      name="classAndLevel"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    <p className="text-center">Background</p>
                    <input
                      type="text"
                      placeholder="Background"
                      name="background"
                      value={classBackground}
                      onChange={(e) => setClassBackground(e.target.value)}
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    <p className="text-center">Level</p>
                    <input
                      type="number"
                      placeholder="Level"
                      name="level"
                      value={characterSpellLevel}
                      onChange={(e) => setCharacterSpellLevel(e.target.value)}
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="grid col-start-2 col-span-2 grid-cols-3">
                  <div>
                    Race
                    <input
                      type="text"
                      placeholder="Race"
                      name="race"
                      value={characterRace}
                      onChange={(e) => setCharacterRace(e.target.value)}
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Alignment
                    <input
                      type="text"
                      placeholder="Alignment"
                      name="alignment"
                      value={characterAlignment}
                      onChange={(e) => setCharacterAlignment(e.target.value)}
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Experience
                    <input
                      type="number"
                      placeholder="Experience"
                      name="experience"
                      value={characterExperience}
                      onChange={(e) => setCharacterExperience(e.target.value)}
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between space-x-1 mt-4">
              <div className="grid grid-cols-1 space-y-1 w-1/4">
                <div className="text-center border-2">
                  Inspiration
                  <input
                    type="number"
                    placeholder="0"
                    name="inspiration"
                    value={characterInspiration}
                    onChange={(e) => setCharacterInspiration(e.target.value)}
                    className="border rounded-md p-2 text-md text-white text-center w-16"
                  />
                </div>
                <div className="text-center border-2">
                  Proficiency Bonus
                  <input
                    type="number"
                    placeholder="0"
                    name="proficiencyBonus"
                    value={characterProficiencyBonus}
                    onChange={(e) =>
                      setCharacterProficiencyBonus(e.target.value)
                    }
                    className="border rounded-md p-2 text-sm text-white text-center w-16"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 border-2 py-3 space-y-1">
                  <CharacterStats
                    name="strength"
                    nameModifier="strengthModifier"
                    label="Strength"
                    modifier="1"
                    setStatValue={(e) => setCharacterStrength(e.target.value)}
                    statValue={characterStrength}
                    setModifierValue={(e) =>
                      setCharacterStrengthModifier(e.target.value)
                    }
                    modifierValue={characterStrengthModifier}
                  />
                  <CharacterStats
                    name="dexterity"
                    nameModifier="dexterityModifier"
                    label="Dexterity"
                    setStatValue={(e) => setCharacterDexterity(e.target.value)}
                    statValue={characterDexterity}
                    setModifierValue={(e) =>
                      setCharacterDexterityModifier(e.target.value)
                    }
                    modifierValue={characterDexterityModifier}
                  />
                  <CharacterStats
                    name="constitution"
                    nameModifier="constitutionModifier"
                    label="Constitution"
                    setStatValue={(e) =>
                      setCharacterConstitution(e.target.value)
                    }
                    statValue={characterConstitution}
                    setModifierValue={(e) =>
                      setCharacterConstitutionModifier(e.target.value)
                    }
                    modifierValue={characterConstitutionModifier}
                  />
                  <CharacterStats
                    name="intelligence"
                    nameModifier="intelligenceModifier"
                    label="Intelligence"
                    setStatValue={(e) =>
                      setCharacterIntelligence(e.target.value)
                    }
                    statValue={characterIntelligence}
                    setModifierValue={(e) =>
                      setCharacterIntelligenceModifier(e.target.value)
                    }
                    modifierValue={characterIntelligenceModifier}
                  />
                  <CharacterStats
                    name="wisdom"
                    nameModifier="wisdomModifier"
                    label="Wisdom"
                    setStatValue={(e) => setCharacterWisdom(e.target.value)}
                    statValue={characterWisdom}
                    setModifierValue={(e) =>
                      setCharacterWisdomModifier(e.target.value)
                    }
                    modifierValue={characterWisdomModifier}
                  />
                  <CharacterStats
                    name="charisma"
                    nameModifier="charismaModifier"
                    label="Charisma"
                    setStatValue={(e) => setCharacterCharisma(e.target.value)}
                    statValue={characterCharisma}
                    setModifierValue={(e) =>
                      setCharacterCharismaModifier(e.target.value)
                    }
                    modifierValue={characterCharismaModifier}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-1 border-2 p-1">
                  <SavingThrows
                    savingName="strengthSave"
                    label="Strength"
                    setSavingValue={(e) =>
                      setCharacterStrengthSave(e.target.value)
                    }
                    statSavingValue={characterStrengthSave}
                    checkboxName="characterStrengthSaveChecked"
                    checked={characterStrengthSaveChecked}
                    setChecked={(e) =>
                      setCharacterStrengthSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="dexteritySave"
                    label="Dexterity"
                    setSavingValue={(e) =>
                      setCharacterDexteritySave(e.target.value)
                    }
                    statSavingValue={characterDexteritySave}
                    checkboxName="characterDexteritySaveChecked"
                    checked={characterDexteritySaveChecked}
                    setChecked={(e) =>
                      setCharacterDexteritySaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="constitutionSave"
                    label="Constitution"
                    setSavingValue={(e) =>
                      setCharacterConstitutionSave(e.target.value)
                    }
                    statSavingValue={characterConstitutionSave}
                    checkboxName="characterConstitutionSaveChecked"
                    checked={characterConstitutionSaveChecked}
                    setChecked={(e) =>
                      setCharacterConstitutionSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="intelligenceSave"
                    label="Intelligence"
                    setSavingValue={(e) =>
                      setCharacterIntelligenceSave(e.target.value)
                    }
                    statSavingValue={characterIntelligenceSave}
                    checkboxName="characterIntelligenceSaveChecked"
                    checked={characterIntelligenceSaveChecked}
                    setChecked={(e) =>
                      setCharacterIntelligenceSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="wisdomSave"
                    label="Wisdom"
                    setSavingValue={(e) =>
                      setCharacterWisdomSave(e.target.value)
                    }
                    statSavingValue={characterWisdomSave}
                    checkboxName="characterWisdomSaveChecked"
                    checked={characterWisdomSaveChecked}
                    setChecked={(e) =>
                      setCharacterWisdomSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="charismaSave"
                    label="Charisma"
                    setSavingValue={(e) =>
                      setCharacterCharismaSave(e.target.value)
                    }
                    statSavingValue={characterCharismaSave}
                    checkboxName="characterCharismaSaveChecked"
                    checked={characterCharismaSaveChecked}
                    setChecked={(e) =>
                      setCharacterCharismaSaveChecked(e.target.checked)
                    }
                  />
                  <p className="text-center text-sm">Saving Throws</p>
                </div>
                <div className="grid grid-cols-1 mt-1 border-2 p-1 justify-end items-end">
                  <SavingThrows
                    savingName="acrobatics"
                    label="Acrobatics"
                    setSavingValue={(e) =>
                      setCharacterAcrobatics(e.target.value)
                    }
                    statSavingValue={characterAcrobatics}
                    checkboxName="characterAcrobaticsChecked"
                    checked={characterAcrobaticsChecked}
                    setChecked={(e) =>
                      setCharacterAcrobaticsChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="animalHandling"
                    label="Animal Handling"
                    setSavingValue={(e) =>
                      setCharacterAnimalHandling(e.target.value)
                    }
                    statSavingValue={characterAnimalHandling}
                    checkboxName="characterAnimalHandlingChecked"
                    checked={characterAnimalHandlingChecked}
                    setChecked={(e) =>
                      setCharacterAnimalHandlingChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="arcana"
                    label="Arcana"
                    setSavingValue={(e) => setCharacterArcana(e.target.value)}
                    statSavingValue={characterArcana}
                    checkboxName="characterArcanaChecked"
                    checked={characterArcanaChecked}
                    setChecked={(e) =>
                      setCharacterArcanaChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="athletics"
                    label="Athletics"
                    setSavingValue={(e) =>
                      setCharacterAthletics(e.target.value)
                    }
                    statSavingValue={characterAthletics}
                    checkboxName="characterAthleticsChecked"
                    checked={characterAthleticsChecked}
                    setChecked={(e) =>
                      setCharacterAthleticsChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="deception"
                    label="Deception"
                    setSavingValue={(e) =>
                      setCharacterDeception(e.target.value)
                    }
                    statSavingValue={characterDeception}
                    checkboxName="characterDeceptionChecked"
                    checked={characterDeceptionChecked}
                    setChecked={(e) =>
                      setCharacterDeceptionChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="history"
                    label="History"
                    setSavingValue={(e) => setCharacterHistory(e.target.value)}
                    statSavingValue={characterHistory}
                    checkboxName="characterHistoryChecked"
                    checked={characterHistoryChecked}
                    setChecked={(e) =>
                      setCharacterHistoryChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="insight"
                    label="Insight"
                    setSavingValue={(e) => setCharacterInsight(e.target.value)}
                    statSavingValue={characterInsight}
                    checkboxName="characterInsightChecked"
                    checked={characterInsightChecked}
                    setChecked={(e) =>
                      setCharacterInsightChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="intimidation"
                    label="Intimidation"
                    setSavingValue={(e) =>
                      setCharacterIntimidation(e.target.value)
                    }
                    statSavingValue={characterIntimidation}
                    checkboxName="characterIntimidationChecked"
                    checked={characterIntimidationChecked}
                    setChecked={(e) =>
                      setCharacterIntimidationChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="investigation"
                    label="Investigation"
                    setSavingValue={(e) =>
                      setCharacterInvestigation(e.target.value)
                    }
                    statSavingValue={characterInvestigation}
                    checkboxName="characterInvestigationChecked"
                    checked={characterInvestigationChecked}
                    setChecked={(e) =>
                      setCharacterInvestigationChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="medicine"
                    label="Medicine"
                    setSavingValue={(e) => setCharacterMedicine(e.target.value)}
                    statSavingValue={characterMedicine}
                    checkboxName="characterMedicineChecked"
                    checked={characterMedicineChecked}
                    setChecked={(e) =>
                      setCharacterMedicineChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="nature"
                    label="Nature"
                    setSavingValue={(e) => setCharacterNature(e.target.value)}
                    statSavingValue={characterNature}
                    checkboxName="characterNatureChecked"
                    checked={characterNatureChecked}
                    setChecked={(e) =>
                      setCharacterNatureChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="perception"
                    label="Perception"
                    setSavingValue={(e) =>
                      setCharacterPerception(e.target.value)
                    }
                    statSavingValue={characterPerception}
                    checkboxName="characterPerceptionChecked"
                    checked={characterPerceptionChecked}
                    setChecked={(e) =>
                      setCharacterPerceptionChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="performance"
                    label="Performance"
                    setSavingValue={(e) =>
                      setCharacterPerformance(e.target.value)
                    }
                    statSavingValue={characterPerformance}
                    checkboxName="characterPerformanceChecked"
                    checked={characterPerformanceChecked}
                    setChecked={(e) =>
                      setCharacterPerformanceChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="persuasion"
                    label="Persuasion"
                    setSavingValue={(e) =>
                      setCharacterPersuasion(e.target.value)
                    }
                    statSavingValue={characterPersuasion}
                    checkboxName="characterPersuasionChecked"
                    checked={characterPersuasionChecked}
                    setChecked={(e) =>
                      setCharacterPersuasionChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="religion"
                    label="Religion"
                    setSavingValue={(e) => setCharacterReligion(e.target.value)}
                    statSavingValue={characterReligion}
                    checkboxName="characterReligionChecked"
                    checked={characterReligionChecked}
                    setChecked={(e) =>
                      setCharacterReligionChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="slightOfHand"
                    label="Sleight of Hand"
                    setSavingValue={(e) =>
                      setCharacterSleightOfHand(e.target.value)
                    }
                    statSavingValue={characterSleightOfHand}
                    checkboxName="characterSleightOfHandChecked"
                    checked={characterSleightOfHandChecked}
                    setChecked={(e) =>
                      setCharacterSleightOfHandChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="stealth"
                    label="Stealth"
                    setSavingValue={(e) => setCharacterStealth(e.target.value)}
                    statSavingValue={characterStealth}
                    checkboxName="characterStealthChecked"
                    checked={characterStealthChecked}
                    setChecked={(e) =>
                      setCharacterStealthChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="survival"
                    label="Survival"
                    setSavingValue={(e) => setCharacterSurvival(e.target.value)}
                    statSavingValue={characterSurvival}
                    checkboxName="characterSurvivalChecked"
                    checked={characterSurvivalChecked}
                    setChecked={(e) =>
                      setCharacterSurvivalChecked(e.target.checked)
                    }
                  />
                  <p className="text-center text-sm">Skills</p>
                  <div className="text-center border-2 h-24">
                    Passive Wisdom (Perception)
                    <input
                      type="number"
                      placeholder="0"
                      className="border rounded-md p-2 text-sm text-white text-center w-16"
                      name="passiveWisdom"
                      value={characterPassiveWisdom}
                      onChange={(e) =>
                        setCharacterPassiveWisdom(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1 w-1/2">
                <div className="grid grid-cols-3 gap-4 border-2 p-1">
                  <Attribute
                    name="maxHP"
                    label="Max HP"
                    attributeValue={characterMaxHP}
                    setAttributeValue={(e) => setCharacterMaxHP(e.target.value)}
                  />
                  <Attribute
                    name="currentHP"
                    label="Current HP"
                    attributeValue={characterCurrentHP}
                    setAttributeValue={(e) =>
                      setCharacterCurrentHP(e.target.value)
                    }
                  />
                  <Attribute
                    name="tempHP"
                    label="Temp HP"
                    attributeValue={characterTempHP}
                    setAttributeValue={(e) =>
                      setCharacterTempHP(e.target.value)
                    }
                  />
                </div>
                <div className="mt-1 grid grid-cols-3 gap-4 border-2 p-1">
                  <Attribute
                    name="ac"
                    label="Armor Class"
                    attributeValue={characterAC}
                    setAttributeValue={(e) => setCharacterAC(e.target.value)}
                  />
                  <Attribute
                    name="initiative"
                    label="Initiative"
                    attributeValue={characterInitiative}
                    setAttributeValue={(e) =>
                      setCharacterInitiative(e.target.value)
                    }
                  />
                  <Attribute
                    name="speed"
                    label="Speed"
                    attributeValue={characterSpeed}
                    setAttributeValue={(e) => setCharacterSpeed(e.target.value)}
                  />
                </div>
                <div className="flex text-center mt-1 space-x-1">
                  <div className="w-1/2 border-2">
                    <HitDice
                      hitDice1="hitDice1"
                      hitDice2="hitDice2"
                      name="hitDice"
                      label="Total"
                      setHitDice1={(e) => setCharacterHitDice1(e.target.value)}
                      hitDice1Value={characterHitDice1}
                      setHitDice2={(e) => setCharacterHitDice2(e.target.value)}
                      hitDice2Value={characterHitDice2}
                    />
                    Hit Dice
                  </div>
                  <div className="w-1/2 border-2">
                    <div>
                      <DeathSaves label="Success" />
                      <DeathSaves label="Failure" />
                    </div>
                    Death Saves
                  </div>
                </div>
                <div className="text-xl text-center border-2 p-1 mt-1">
                  <AttAndSpells
                    name="attacksAndSpells"
                    attName1Value={characterAttName1}
                    setAttName1={(e) => setCharacterAttName1(e.target.value)}
                    attBonus1Value={characterAttBonus1}
                    setAttBonus1={(e) => setCharacterAttBonus1(e.target.value)}
                    attDmg1Value={characterAttDamage1}
                    setAttDmg1={(e) => setCharacterAttDamage1(e.target.value)}
                    attName2Value={characterAttName2}
                    setAttName2={(e) => setCharacterAttName2(e.target.value)}
                    attBonus2Value={characterAttBonus2}
                    setAttBonus2={(e) => setCharacterAttBonus2(e.target.value)}
                    attDmg2Value={characterAttDamage2}
                    setAttDmg2={(e) => setCharacterAttDamage2(e.target.value)}
                    attName3Value={characterAttName3}
                    setAttName3={(e) => setCharacterAttName3(e.target.value)}
                    attBonus3Value={characterAttBonus3}
                    setAttBonus3={(e) => setCharacterAttBonus3(e.target.value)}
                    attDmg3Value={characterAttDamage3}
                    setAttDmg3={(e) => setCharacterAttDamage3(e.target.value)}
                    attAndSpellsTextValue={characterAttackAndSpellsTextArea}
                    setAttAndSpellsText={(e) =>
                      setCharacterAttackAndSpellsTextArea(e.target.value)
                    }
                  />
                </div>
                <div>
                  <EquipmentAndProficiencies
                    textAreaName="equipment"
                    label="Equipment"
                    className="col-span-2"
                    setTextAreaValue={(e) =>
                      setCharacterEquipment(e.target.value)
                    }
                    textAreaValue={characterEquipment}
                  />
                </div>
                <div>
                  <EquipmentAndProficiencies
                    textAreaName="proficienciesAndLanguages"
                    className="col-span-2"
                    label="Proficiencies & Languages"
                    setTextAreaValue={(e) =>
                      setCharacterProficienciesAndLanguages(e.target.value)
                    }
                    textAreaValue={characterProficienciesAndLanguages}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-1 border-2 p-1">
                  <TraitsAndMore
                    textAreaName="personalityTraits"
                    label="Personality Traits"
                    setTextAreaValue={(e) =>
                      setCharacterPersonalityTraits(e.target.value)
                    }
                    textAreaValue={characterPersonalityTraits}
                  />
                  <TraitsAndMore
                    textAreaName="ideals"
                    label="Ideals"
                    setTextAreaValue={(e) => setCharacterIdeals(e.target.value)}
                    textAreaValue={characterIdeals}
                  />
                  <TraitsAndMore
                    textAreaName="bonds"
                    label="Bonds"
                    setTextAreaValue={(e) => setCharacterBonds(e.target.value)}
                    textAreaValue={characterBonds}
                  />
                  <TraitsAndMore
                    textAreaName="flaws"
                    label="Flaws"
                    setTextAreaValue={(e) => setCharacterFlaws(e.target.value)}
                    textAreaValue={characterFlaws}
                  />
                </div>
                <div className="grid grid-cols-1 border-2 p-1">
                  <TraitsAndMore
                    textAreaName="featuresAndTraits"
                    label="Features & Traits"
                    setTextAreaValue={(e) =>
                      setCharacterFeaturesAndTraits(e.target.value)
                    }
                    textAreaValue={characterFeaturesAndTraits}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sheet Two */}
        <main className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-md p-4 w-full">
            <div className="flex">
              <div className="grid grid-cols-2">
                <div>
                  Character Name
                  <input
                    type="text"
                    placeholder="Name"
                    defaultValue={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    name="name"
                    className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                  />
                </div>
                <div className="grid grid-cols-3">
                  <div>
                    Age
                    <input
                      type="number"
                      placeholder="Age"
                      value={characterAge}
                      onChange={(e) => setCharacterAge(e.target.value)}
                      name="age"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Height
                    <input
                      type="text"
                      placeholder="Height"
                      value={characterHeight}
                      onChange={(e) => setCharacterHeight(e.target.value)}
                      name="height"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Weight
                    <input
                      type="text"
                      placeholder="Weight"
                      value={characterWeight}
                      onChange={(e) => setCharacterWeight(e.target.value)}
                      name="weight"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="flex col-start-2">
                <div>
                  Eyes
                  <input
                    type="text"
                    placeholder="Eyes"
                    value={characterEyes}
                    onChange={(e) => setCharacterEyes(e.target.value)}
                    name="eyes"
                    className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                  />
                </div>
                <div>
                  Skin
                  <input
                    type="text"
                    placeholder="Skin"
                    value={characterSkin}
                    onChange={(e) => setCharacterSkin(e.target.value)}
                    name="skin"
                    className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                  />
                </div>
                <div>
                  Hair
                  <input
                    type="text"
                    placeholder="Hair"
                    value={characterHair}
                    onChange={(e) => setCharacterHair(e.target.value)}
                    name="hair"
                    className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="grid grid-cols-3 space-x-1">
                <div className="border-2 p-1">
                  <AppearanceAndBackground
                    textAreaName="characterAppearance"
                    label="Character Appearance"
                    setTextAreaValue={(e) =>
                      setCharacterDescription(e.target.value)
                    }
                    textAreaValue={characterDescription}
                  />
                </div>
                <div className="border-2 p-1 col-span-2">
                  <AppearanceAndBackground
                    textAreaName="alliesAndOrganizations"
                    label="Allies and Organizations"
                    setTextAreaValue={(e) =>
                      setCharacterAlliesAndOrganizations(e.target.value)
                    }
                    textAreaValue={characterAlliesAndOrganizations}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 space-x-1">
                <div className="border-2 p-1">
                  <AppearanceAndBackground
                    textAreaName="characterBackground"
                    label="Character Background"
                    setTextAreaValue={(e) =>
                      setCharacterBackground(e.target.value)
                    }
                    textAreaValue={characterBackground}
                  />
                </div>
                <div className="border-2 p-1 col-span-2">
                  <CharacterText
                    textAreaName="additionalFeaturesAndTraits"
                    label="Additional Features & Traits"
                    setTextAreaValue={(e) =>
                      setCharacterAdditionalFeaturesAndTraits(e.target.value)
                    }
                    textAreaValue={characterAdditionalFeaturesAndTraits}
                  />
                  <CharacterText
                    textAreaName="treasures"
                    label="Treasures"
                    setTextAreaValue={(e) =>
                      setCharacterTreasures(e.target.value)
                    }
                    textAreaValue={characterTreasures}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sheet Three */}
        <main className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-md p-4 w-full">
            <div className="flex">
              <div className="grid grid-cols-2">
                <div>
                  Character Name
                  <input
                    type="text"
                    placeholder="Name"
                    defaultValue={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    name="name"
                    className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                  />
                </div>
                <div className="grid grid-cols-3">
                  <div>
                    Spell Ability
                    <input
                      type="text"
                      placeholder="Spell Ability"
                      defaultValue={characterSpellAbility}
                      onChange={(e) => setCharacterSpellAbility(e.target.value)}
                      name="spellAbility"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Spell Save DC
                    <input
                      type="text"
                      placeholder="Spell Save DC"
                      defaultValue={characterSpellSaveDC}
                      onChange={(e) => setCharacterSpellSaveDC(e.target.value)}
                      name="spellSaveDC"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Spell Att Bonus
                    <input
                      type="text"
                      placeholder="Spell Att Bonus"
                      defaultValue={characterSpellAttackBonus}
                      onChange={(e) =>
                        setCharacterSpellAttackBonus(e.target.value)
                      }
                      name="spellAttBonus"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="grid grid-cols-3 space-x-1">
                <div className="p-1 space-y-1">
                  <div className="border-2">
                    <CharacterCantrips
                      cantrip="cantripNumber"
                      label="Cantrips"
                      cantripNumber={characterCantripNumber}
                      setCantripNumber={(e) =>
                        setCharacterCantripNumber(e.target.value)
                      }
                    />
                    <SpellNames
                      spell={characterCantrip1}
                      setSpell={(e) => setCharacterCantrip1(e.target.value)}
                      checked={characterCantrip1Checked}
                      setChecked={(e) =>
                        setCharacterCantrip1Checked(e.target.checked)
                      }
                      spellName="cantrip1"
                      checkboxName="cantrip1Checked"
                    />
                    <SpellNames
                      spellName="cantrip2"
                      checkboxName="cantrip2Checked"
                      spell={characterCantrip2}
                      setSpell={(e) => setCharacterCantrip2(e.target.value)}
                      checked={characterCantrip2Checked}
                      setChecked={(e) =>
                        setCharacterCantrip2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="cantrip3"
                      checkboxName="cantrip3Checked"
                      spell={characterCantrip3}
                      setSpell={(e) => setCharacterCantrip3(e.target.value)}
                      checked={characterCantrip3Checked}
                      setChecked={(e) =>
                        setCharacterCantrip3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="cantrip4"
                      checkboxName="cantrip4Checked"
                      spell={characterCantrip4}
                      setSpell={(e) => setCharacterCantrip4(e.target.value)}
                      checked={characterCantrip4Checked}
                      setChecked={(e) =>
                        setCharacterCantrip4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="cantrip5"
                      checkboxName="cantrip5Checked"
                      spell={characterCantrip5}
                      setSpell={(e) => setCharacterCantrip5(e.target.value)}
                      checked={characterCantrip5Checked}
                      setChecked={(e) =>
                        setCharacterCantrip5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="cantrip6"
                      checkboxName="cantrip6Checked"
                      spell={characterCantrip6}
                      setSpell={(e) => setCharacterCantrip6(e.target.value)}
                      checked={characterCantrip6Checked}
                      setChecked={(e) =>
                        setCharacterCantrip6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="cantrip7"
                      checkboxName="cantrip7Checked"
                      spell={characterCantrip7}
                      setSpell={(e) => setCharacterCantrip7(e.target.value)}
                      checked={characterCantrip7Checked}
                      setChecked={(e) =>
                        setCharacterCantrip7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="cantrip8"
                      checkboxName="cantrip8Checked"
                      spell={characterCantrip8}
                      setSpell={(e) => setCharacterCantrip8(e.target.value)}
                      checked={characterCantrip8Checked}
                      setChecked={(e) =>
                        setCharacterCantrip8Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="1"
                      slotsTotalName="spellLevel1Total"
                      slotsTotalValue={spellLevel1Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel1Total(e.target.value)
                      }
                      slotsUsedName="spellLevel1Used"
                      slotsUsedValue={spellLevel1Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel1Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell1"
                      spell={characterSpellLevel1Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell1Checked"
                      checked={characterSpellLevel1Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell2"
                      spell={characterSpellLevel1Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell2Checked"
                      checked={characterSpellLevel1Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell3"
                      spell={characterSpellLevel1Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell3Checked"
                      checked={characterSpellLevel1Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell4"
                      spell={characterSpellLevel1Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell4Checked"
                      checked={characterSpellLevel1Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell5"
                      spell={characterSpellLevel1Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell5Checked"
                      checked={characterSpellLevel1Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell6"
                      spell={characterSpellLevel1Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell6Checked"
                      checked={characterSpellLevel1Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell7"
                      spell={characterSpellLevel1Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell7Checked"
                      checked={characterSpellLevel1Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell8"
                      spell={characterSpellLevel1Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell8Checked"
                      checked={characterSpellLevel1Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell8Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell9"
                      spell={characterSpellLevel1Spell9}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell9(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell9Checked"
                      checked={characterSpellLevel1Spell9Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell9Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell10"
                      spell={characterSpellLevel1Spell10}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell10(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell10Checked"
                      checked={characterSpellLevel1Spell10Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell10Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell11"
                      spell={characterSpellLevel1Spell11}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell11(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell11Checked"
                      checked={characterSpellLevel1Spell11Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell11Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell12"
                      spell={characterSpellLevel1Spell12}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell12(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell12Checked"
                      checked={characterSpellLevel1Spell12Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell12Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel1Spell13"
                      spell={characterSpellLevel1Spell13}
                      setSpell={(e) =>
                        setCharacterSpellLevel1Spell13(e.target.value)
                      }
                      checkboxName="characterSpellLevel1Spell13Checked"
                      checked={characterSpellLevel1Spell13Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel1Spell13Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="2"
                      slotsTotalName="spellLevel2Total"
                      slotsTotalValue={spellLevel2Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel2Total(e.target.value)
                      }
                      slotsUsedName="spellLevel2Used"
                      slotsUsedValue={spellLevel2Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel2Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell1"
                      spell={characterSpellLevel2Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell1Checked"
                      checked={characterSpellLevel2Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell2"
                      spell={characterSpellLevel2Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell2Checked"
                      checked={characterSpellLevel2Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell3"
                      spell={characterSpellLevel2Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell3Checked"
                      checked={characterSpellLevel2Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell4"
                      spell={characterSpellLevel2Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell4Checked"
                      checked={characterSpellLevel2Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell5"
                      spell={characterSpellLevel2Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell5Checked"
                      checked={characterSpellLevel2Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell6"
                      spell={characterSpellLevel2Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell6Checked"
                      checked={characterSpellLevel2Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell7"
                      spell={characterSpellLevel2Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell7Checked"
                      checked={characterSpellLevel2Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell8"
                      spell={characterSpellLevel2Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell8Checked"
                      checked={characterSpellLevel2Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell8Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell9"
                      spell={characterSpellLevel2Spell9}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell9(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell9Checked"
                      checked={characterSpellLevel2Spell9Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell9Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell10"
                      spell={characterSpellLevel2Spell10}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell10(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell10Checked"
                      checked={characterSpellLevel2Spell10Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell10Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell11"
                      spell={characterSpellLevel2Spell11}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell11(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell11Checked"
                      checked={characterSpellLevel2Spell11Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell11Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell12"
                      spell={characterSpellLevel2Spell12}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell12(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell12Checked"
                      checked={characterSpellLevel2Spell12Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell12Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel2Spell13"
                      spell={characterSpellLevel2Spell13}
                      setSpell={(e) =>
                        setCharacterSpellLevel2Spell13(e.target.value)
                      }
                      checkboxName="characterSpellLevel2Spell13Checked"
                      checked={characterSpellLevel2Spell13Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel2Spell13Checked(e.target.checked)
                      }
                    />
                  </div>
                </div>
                <div className="p-1 space-y-1">
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="3"
                      slotsTotalName="spellLevel3Total"
                      slotsTotalValue={spellLevel3Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel3Total(e.target.value)
                      }
                      slotsUsedName="spellLevel3Used"
                      slotsUsedValue={spellLevel3Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel3Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell1"
                      spell={characterSpellLevel3Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell1Checked"
                      checked={characterSpellLevel3Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell2"
                      spell={characterSpellLevel3Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell2Checked"
                      checked={characterSpellLevel3Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell3"
                      spell={characterSpellLevel3Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell3Checked"
                      checked={characterSpellLevel3Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell4"
                      spell={characterSpellLevel3Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell4Checked"
                      checked={characterSpellLevel3Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell5"
                      spell={characterSpellLevel3Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell5Checked"
                      checked={characterSpellLevel3Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell6"
                      spell={characterSpellLevel3Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell6Checked"
                      checked={characterSpellLevel3Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell7"
                      spell={characterSpellLevel3Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell7Checked"
                      checked={characterSpellLevel3Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell8"
                      spell={characterSpellLevel3Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell8Checked"
                      checked={characterSpellLevel3Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell8Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell9"
                      spell={characterSpellLevel3Spell9}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell9(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell9Checked"
                      checked={characterSpellLevel3Spell9Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell9Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell10"
                      spell={characterSpellLevel3Spell10}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell10(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell10Checked"
                      checked={characterSpellLevel3Spell10Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell10Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell11"
                      spell={characterSpellLevel3Spell11}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell11(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell11Checked"
                      checked={characterSpellLevel3Spell11Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell11Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell12"
                      spell={characterSpellLevel3Spell12}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell12(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell12Checked"
                      checked={characterSpellLevel3Spell12Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell12Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel3Spell13"
                      spell={characterSpellLevel3Spell13}
                      setSpell={(e) =>
                        setCharacterSpellLevel3Spell13(e.target.value)
                      }
                      checkboxName="characterSpellLevel3Spell13Checked"
                      checked={characterSpellLevel3Spell13Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel3Spell13Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="4"
                      slotsTotalName="spellLevel4Total"
                      slotsTotalValue={spellLevel4Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel4Total(e.target.value)
                      }
                      slotsUsedName="spellLevel4Used"
                      slotsUsedValue={spellLevel4Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel4Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell1"
                      spell={characterSpellLevel4Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell1Checked"
                      checked={characterSpellLevel4Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell2"
                      spell={characterSpellLevel4Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell2Checked"
                      checked={characterSpellLevel4Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell3"
                      spell={characterSpellLevel4Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell3Checked"
                      checked={characterSpellLevel4Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell4"
                      spell={characterSpellLevel4Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell4Checked"
                      checked={characterSpellLevel4Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell5"
                      spell={characterSpellLevel4Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell5Checked"
                      checked={characterSpellLevel4Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell6"
                      spell={characterSpellLevel4Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell6Checked"
                      checked={characterSpellLevel4Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell7"
                      spell={characterSpellLevel4Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell7Checked"
                      checked={characterSpellLevel4Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell8"
                      spell={characterSpellLevel4Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell8Checked"
                      checked={characterSpellLevel4Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell8Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell9"
                      spell={characterSpellLevel4Spell9}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell9(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell9Checked"
                      checked={characterSpellLevel4Spell9Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell9Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell10"
                      spell={characterSpellLevel4Spell10}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell10(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell10Checked"
                      checked={characterSpellLevel4Spell10Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell10Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell11"
                      spell={characterSpellLevel4Spell11}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell11(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell11Checked"
                      checked={characterSpellLevel4Spell11Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell11Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell12"
                      spell={characterSpellLevel4Spell12}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell12(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell12Checked"
                      checked={characterSpellLevel4Spell12Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell12Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel4Spell13"
                      spell={characterSpellLevel4Spell13}
                      setSpell={(e) =>
                        setCharacterSpellLevel4Spell13(e.target.value)
                      }
                      checkboxName="characterSpellLevel4Spell13Checked"
                      checked={characterSpellLevel4Spell13Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel4Spell13Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="5"
                      slotsTotalName="spellLevel5Total"
                      slotsTotalValue={spellLevel5Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel5Total(e.target.value)
                      }
                      slotsUsedName="spellLevel5Used"
                      slotsUsedValue={spellLevel5Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel5Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell1"
                      spell={characterSpellLevel5Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell1Checked"
                      checked={characterSpellLevel5Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell2"
                      spell={characterSpellLevel5Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell2Checked"
                      checked={characterSpellLevel5Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell3"
                      spell={characterSpellLevel5Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell3Checked"
                      checked={characterSpellLevel5Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell4"
                      spell={characterSpellLevel5Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell4Checked"
                      checked={characterSpellLevel5Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell5"
                      spell={characterSpellLevel5Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell5Checked"
                      checked={characterSpellLevel5Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell6"
                      spell={characterSpellLevel5Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell6Checked"
                      checked={characterSpellLevel5Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell7"
                      spell={characterSpellLevel5Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell7Checked"
                      checked={characterSpellLevel5Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel5Spell8"
                      spell={characterSpellLevel5Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel5Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel5Spell8Checked"
                      checked={characterSpellLevel5Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel5Spell8Checked(e.target.checked)
                      }
                    />
                  </div>
                </div>
                <div className="p-1 space-y-1">
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="6"
                      slotsTotalName="spellLevel6Total"
                      slotsTotalValue={spellLevel6Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel6Total(e.target.value)
                      }
                      slotsUsedName="spellLevel6Used"
                      slotsUsedValue={spellLevel6Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel6Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell1"
                      spell={characterSpellLevel6Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell1Checked"
                      checked={characterSpellLevel6Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell2"
                      spell={characterSpellLevel6Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell2Checked"
                      checked={characterSpellLevel6Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell3"
                      spell={characterSpellLevel6Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell3Checked"
                      checked={characterSpellLevel6Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell4"
                      spell={characterSpellLevel6Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell4Checked"
                      checked={characterSpellLevel6Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell5"
                      spell={characterSpellLevel6Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell5Checked"
                      checked={characterSpellLevel6Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell6"
                      spell={characterSpellLevel6Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell6Checked"
                      checked={characterSpellLevel6Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell7"
                      spell={characterSpellLevel6Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell7Checked"
                      checked={characterSpellLevel6Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel6Spell8"
                      spell={characterSpellLevel6Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel6Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel6Spell8Checked"
                      checked={characterSpellLevel6Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel6Spell8Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="7"
                      slotsTotalName="spellLevel7Total"
                      slotsTotalValue={spellLevel7Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel7Total(e.target.value)
                      }
                      slotsUsedName="spellLevel7Used"
                      slotsUsedValue={spellLevel7Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel7Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell1"
                      spell={characterSpellLevel7Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell1Checked"
                      checked={characterSpellLevel7Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell2"
                      spell={characterSpellLevel7Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell2Checked"
                      checked={characterSpellLevel7Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell3"
                      spell={characterSpellLevel7Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell3Checked"
                      checked={characterSpellLevel7Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell4"
                      spell={characterSpellLevel7Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell4Checked"
                      checked={characterSpellLevel7Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell5"
                      spell={characterSpellLevel7Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell5Checked"
                      checked={characterSpellLevel7Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell6"
                      spell={characterSpellLevel7Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell7Checked"
                      checked={characterSpellLevel7Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell7"
                      spell={characterSpellLevel7Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell7Checked"
                      checked={characterSpellLevel7Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel7Spell8"
                      spell={characterSpellLevel7Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel7Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel7Spell8Checked"
                      checked={characterSpellLevel7Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel7Spell8Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="8"
                      slotsTotalName="spellLevel8Total"
                      slotsTotalValue={spellLevel8Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel8Total(e.target.value)
                      }
                      slotsUsedName="spellLevel8Used"
                      slotsUsedValue={spellLevel8Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel8Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell1"
                      spell={characterSpellLevel8Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell1Checked"
                      checked={characterSpellLevel8Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell2"
                      spell={characterSpellLevel8Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell2Checked"
                      checked={characterSpellLevel8Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell3"
                      spell={characterSpellLevel8Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell3Checked"
                      checked={characterSpellLevel8Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell4"
                      spell={characterSpellLevel8Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell4Checked"
                      checked={characterSpellLevel8Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell5"
                      spell={characterSpellLevel8Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell5Checked"
                      checked={characterSpellLevel8Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell6"
                      spell={characterSpellLevel8Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell6Checked"
                      checked={characterSpellLevel8Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell7"
                      spell={characterSpellLevel8Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell7Checked"
                      checked={characterSpellLevel8Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel8Spell8"
                      spell={characterSpellLevel8Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel8Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel8Spell8Checked"
                      checked={characterSpellLevel8Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel8Spell8Checked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="border-2 p-1">
                    <CharacterSpells
                      level="9"
                      slotsTotalName="spellLevel9Total"
                      slotsTotalValue={spellLevel9Total}
                      setSlotsTotalValue={(e) =>
                        setSpellLevel9Total(e.target.value)
                      }
                      slotsUsedName="spellLevel9Used"
                      slotsUsedValue={spellLevel9Used}
                      setSlotsUsedValue={(e) =>
                        setSpellLevel9Used(e.target.value)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell1"
                      spell={characterSpellLevel9Spell1}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell1(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell1Checked"
                      checked={characterSpellLevel9Spell1Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell1Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell2"
                      spell={characterSpellLevel9Spell2}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell2(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell2Checked"
                      checked={characterSpellLevel9Spell2Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell2Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell3"
                      spell={characterSpellLevel9Spell3}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell3(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell3Checked"
                      checked={characterSpellLevel9Spell3Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell3Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell4"
                      spell={characterSpellLevel9Spell4}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell4(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell4Checked"
                      checked={characterSpellLevel9Spell4Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell4Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell5"
                      spell={characterSpellLevel9Spell5}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell5(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell5Checked"
                      checked={characterSpellLevel9Spell5Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell5Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell6"
                      spell={characterSpellLevel9Spell6}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell6(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell6Checked"
                      checked={characterSpellLevel9Spell6Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell6Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell7"
                      spell={characterSpellLevel9Spell7}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell7(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell7Checked"
                      checked={characterSpellLevel9Spell7Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell7Checked(e.target.checked)
                      }
                    />
                    <SpellNames
                      spellName="spellLevel9Spell8"
                      spell={characterSpellLevel9Spell8}
                      setSpell={(e) =>
                        setCharacterSpellLevel9Spell8(e.target.value)
                      }
                      checkboxName="characterSpellLevel9Spell8Checked"
                      checked={characterSpellLevel9Spell8Checked}
                      setChecked={(e) =>
                        setCharacterSpellLevel9Spell8Checked(e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </form>

      {/* For Mobile */}
      <form
        ref={ref}
        className="sm:hidden container p-4 space-y-6 w-full"
      >
        <div className="flex justify-center space-x-4">
          <h1 className="text-4xl font-bold">Character Sheet</h1>
          {!user ? (
            <button
              className="bg-defaultButton p-2 rounded-md hover:bg-gray-500"
              disabled
            >
              <p>Login to Save PCs</p>
            </button>
          ) : (
            <button
              onClick={!pcId ? handleSavePc : handleUpdatePc}
              type="submit"
              className="bg-defaultButton p-2 rounded-md hover:bg-gray-500"
            >
              {!pcId ? (
                <p>Save Character Sheet</p>
              ) : (
                <p>Update Character Sheet</p>
              )}
            </button>
          )}
        </div>

        <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory">
          {/* Sheet One */}
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-[300px]  h-[750px]">
              <div className="grid grid-cols-1 border-2">
                <div className="grid grid-cols-1">
                  <div>
                    <p className="text-center">Character Name</p>
                    <input
                      type="text"
                      placeholder="Name"
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                      name="name"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div className="grid">
                    <div>
                      <p className="text-center">Class</p>
                      <input
                        type="text"
                        placeholder="Class"
                        value={characterCharacterClass}
                        onChange={(e) =>
                          setCharacterCharacterClass(e.target.value)
                        }
                        name="classAndLevel"
                        className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                      />
                    </div>
                    <div>
                      <p className="text-center">Background</p>
                      <input
                        type="text"
                        placeholder="Background"
                        name="background"
                        value={classBackground}
                        onChange={(e) => setClassBackground(e.target.value)}
                        className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                      />
                    </div>
                    <div>
                      <p className="text-center">Level</p>
                      <input
                        type="number"
                        placeholder="Level"
                        name="level"
                        value={characterSpellLevel}
                        onChange={(e) => setCharacterSpellLevel(e.target.value)}
                        className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                      />
                    </div>
                  </div>
                  <div className="grid">
                    <div className="grid col-start-2 col-span-2 grid-cols-3">
                      <div>
                        Race
                        <input
                          type="text"
                          placeholder="Race"
                          name="race"
                          value={characterRace}
                          onChange={(e) => setCharacterRace(e.target.value)}
                          className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                        />
                      </div>
                      <div>
                        Alignment
                        <input
                          type="text"
                          placeholder="Alignment"
                          name="alignment"
                          value={characterAlignment}
                          onChange={(e) =>
                            setCharacterAlignment(e.target.value)
                          }
                          className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                        />
                      </div>
                      <div>
                        Experience
                        <input
                          type="number"
                          placeholder="Experience"
                          name="experience"
                          value={characterExperience}
                          onChange={(e) =>
                            setCharacterExperience(e.target.value)
                          }
                          className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="text-center border-2 h-24">
                  <p>Inspiration</p>
                  <input
                    type="number"
                    placeholder="0"
                    name="inspiration"
                    value={characterInspiration}
                    onChange={(e) => setCharacterInspiration(e.target.value)}
                    className="border rounded-md p-2 text-sm text-white text-center w-16"
                  />
                </div>
                <div className="text-center border-2 h-24">
                  <p>Proficiency Bonus</p>
                  <input
                    type="number"
                    placeholder="0"
                    name="proficiencyBonus"
                    value={characterProficiencyBonus}
                    onChange={(e) =>
                      setCharacterProficiencyBonus(e.target.value)
                    }
                    className="border rounded-md p-2 text-sm text-white text-center w-16"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2">
                <CharacterStats
                  name="strength"
                  nameModifier="strengthModifier"
                  label="Strength"
                  modifier="1"
                  setStatValue={(e) => setCharacterStrength(e.target.value)}
                  statValue={characterStrength}
                  setModifierValue={(e) =>
                    setCharacterStrengthModifier(e.target.value)
                  }
                  modifierValue={characterStrengthModifier}
                />
                <CharacterStats
                  name="dexterity"
                  nameModifier="dexterityModifier"
                  label="Dexterity"
                  setStatValue={(e) => setCharacterDexterity(e.target.value)}
                  statValue={characterDexterity}
                  setModifierValue={(e) =>
                    setCharacterDexterityModifier(e.target.value)
                  }
                  modifierValue={characterDexterityModifier}
                />
                <CharacterStats
                  name="constitution"
                  nameModifier="constitutionModifier"
                  label="Constitution"
                  setStatValue={(e) => setCharacterConstitution(e.target.value)}
                  statValue={characterConstitution}
                  setModifierValue={(e) =>
                    setCharacterConstitutionModifier(e.target.value)
                  }
                  modifierValue={characterConstitutionModifier}
                />
                <CharacterStats
                  name="intelligence"
                  nameModifier="intelligenceModifier"
                  label="Intelligence"
                  setStatValue={(e) => setCharacterIntelligence(e.target.value)}
                  statValue={characterIntelligence}
                  setModifierValue={(e) =>
                    setCharacterIntelligenceModifier(e.target.value)
                  }
                  modifierValue={characterIntelligenceModifier}
                />
                <CharacterStats
                  name="wisdom"
                  nameModifier="wisdomModifier"
                  label="Wisdom"
                  setStatValue={(e) => setCharacterWisdom(e.target.value)}
                  statValue={characterWisdom}
                  setModifierValue={(e) =>
                    setCharacterWisdomModifier(e.target.value)
                  }
                  modifierValue={characterWisdomModifier}
                />
                <CharacterStats
                  name="charisma"
                  nameModifier="charismaModifier"
                  label="Charisma"
                  setStatValue={(e) => setCharacterCharisma(e.target.value)}
                  statValue={characterCharisma}
                  setModifierValue={(e) =>
                    setCharacterCharismaModifier(e.target.value)
                  }
                  modifierValue={characterCharismaModifier}
                />
              </div>
            </div>
          </main>

          {/* page 2 */}
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-[300px] h-[750px]">
              <div className="space-y-1">
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-3 gap-4 border-2 p-1">
                    <Attribute
                      name="maxHP"
                      label="Max HP"
                      attributeValue={characterMaxHP}
                      setAttributeValue={(e) =>
                        setCharacterMaxHP(e.target.value)
                      }
                    />
                    <Attribute
                      name="currentHP"
                      label="Current HP"
                      attributeValue={characterCurrentHP}
                      setAttributeValue={(e) =>
                        setCharacterCurrentHP(e.target.value)
                      }
                    />
                    <Attribute
                      name="tempHP"
                      label="Temp HP"
                      attributeValue={characterTempHP}
                      setAttributeValue={(e) =>
                        setCharacterTempHP(e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-1 grid grid-cols-3 gap-4 border-2 p-1">
                    <Attribute
                      name="ac"
                      label="Armor Class"
                      attributeValue={characterAC}
                      setAttributeValue={(e) => setCharacterAC(e.target.value)}
                    />
                    <Attribute
                      name="initiative"
                      label="Initiative"
                      attributeValue={characterInitiative}
                      setAttributeValue={(e) =>
                        setCharacterInitiative(e.target.value)
                      }
                    />
                    <Attribute
                      name="speed"
                      label="Speed"
                      attributeValue={characterSpeed}
                      setAttributeValue={(e) =>
                        setCharacterSpeed(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="border-2">
                    <HitDice
                      hitDice1="hitDice1"
                      hitDice2="hitDice2"
                      name="hitDice"
                      label="Total"
                      setHitDice1={(e) => setCharacterHitDice1(e.target.value)}
                      hitDice1Value={characterHitDice1}
                      setHitDice2={(e) => setCharacterHitDice2(e.target.value)}
                      hitDice2Value={characterHitDice2}
                    />
                    <p className="text-center">Hit Dice</p>
                  </div>
                  <div className="border-2">
                    <div>
                      <DeathSaves label="Success" />
                      <DeathSaves label="Failure" />
                    </div>
                    <p className="text-center">Death Saves</p>
                  </div>
                </div>
                <div className="text-xl text-center border-2 p-1 mt-1">
                  <AttAndSpells
                    name="attacksAndSpells"
                    attName1Value={characterAttName1}
                    setAttName1={(e) => setCharacterAttName1(e.target.value)}
                    attBonus1Value={characterAttBonus1}
                    setAttBonus1={(e) => setCharacterAttBonus1(e.target.value)}
                    attDmg1Value={characterAttDamage1}
                    setAttDmg1={(e) => setCharacterAttDamage1(e.target.value)}
                    attName2Value={characterAttName2}
                    setAttName2={(e) => setCharacterAttName2(e.target.value)}
                    attBonus2Value={characterAttBonus2}
                    setAttBonus2={(e) => setCharacterAttBonus2(e.target.value)}
                    attDmg2Value={characterAttDamage2}
                    setAttDmg2={(e) => setCharacterAttDamage2(e.target.value)}
                    attName3Value={characterAttName3}
                    setAttName3={(e) => setCharacterAttName3(e.target.value)}
                    attBonus3Value={characterAttBonus3}
                    setAttBonus3={(e) => setCharacterAttBonus3(e.target.value)}
                    attDmg3Value={characterAttDamage3}
                    setAttDmg3={(e) => setCharacterAttDamage3(e.target.value)}
                    attAndSpellsTextValue={characterAttackAndSpellsTextArea}
                    setAttAndSpellsText={(e) =>
                      setCharacterAttackAndSpellsTextArea(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </main>

          {/* Sheet 3 */}
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-[300px]  h-[750px]">
              <div className="grid grid-cols-2">
                <div className="text-center border-2">
                  <p>Passive Wisdom (Perception)</p>
                  <input
                    type="number"
                    placeholder="0"
                    className="border rounded-md p-2 text-sm text-white text-center w-16"
                    name="passiveWisdom"
                    value={characterPassiveWisdom}
                    onChange={(e) => setCharacterPassiveWisdom(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 border-2 p-1">
                  <p className="text-center">Saving Throws</p>
                  <SavingThrows
                    savingName="strengthSave"
                    label="Strength"
                    setSavingValue={(e) =>
                      setCharacterStrengthSave(e.target.value)
                    }
                    statSavingValue={characterStrengthSave}
                    checkboxName="characterStrengthSaveChecked"
                    checked={characterStrengthSaveChecked}
                    setChecked={(e) =>
                      setCharacterStrengthSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="dexteritySave"
                    label="Dexterity"
                    setSavingValue={(e) =>
                      setCharacterDexteritySave(e.target.value)
                    }
                    statSavingValue={characterDexteritySave}
                    checkboxName="characterDexteritySaveChecked"
                    checked={characterDexteritySaveChecked}
                    setChecked={(e) =>
                      setCharacterDexteritySaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="constitutionSave"
                    label="Constitution"
                    setSavingValue={(e) =>
                      setCharacterConstitutionSave(e.target.value)
                    }
                    statSavingValue={characterConstitutionSave}
                    checkboxName="characterConstitutionSaveChecked"
                    checked={characterConstitutionSaveChecked}
                    setChecked={(e) =>
                      setCharacterConstitutionSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="intelligenceSave"
                    label="Intelligence"
                    setSavingValue={(e) =>
                      setCharacterIntelligenceSave(e.target.value)
                    }
                    statSavingValue={characterIntelligenceSave}
                    checkboxName="characterIntelligenceSaveChecked"
                    checked={characterIntelligenceSaveChecked}
                    setChecked={(e) =>
                      setCharacterIntelligenceSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="wisdomSave"
                    label="Wisdom"
                    setSavingValue={(e) =>
                      setCharacterWisdomSave(e.target.value)
                    }
                    statSavingValue={characterWisdomSave}
                    checkboxName="characterWisdomSaveChecked"
                    checked={characterWisdomSaveChecked}
                    setChecked={(e) =>
                      setCharacterWisdomSaveChecked(e.target.checked)
                    }
                  />
                  <SavingThrows
                    savingName="charismaSave"
                    label="Charisma"
                    setSavingValue={(e) =>
                      setCharacterCharismaSave(e.target.value)
                    }
                    statSavingValue={characterCharismaSave}
                    checkboxName="characterCharismaSaveChecked"
                    checked={characterCharismaSaveChecked}
                    setChecked={(e) =>
                      setCharacterCharismaSaveChecked(e.target.checked)
                    }
                  />
                </div>
              </div>

              <div className="border-2 px-4">
                <p className="text-center">Skills</p>
                <div className="grid grid-cols-2">
                  <div className="py-2 px-6">
                    <SavingThrows
                      savingName="acrobatics"
                      label="Acrobatics"
                      setSavingValue={(e) =>
                        setCharacterAcrobatics(e.target.value)
                      }
                      statSavingValue={characterAcrobatics}
                      checkboxName="characterAcrobaticsChecked"
                      checked={characterAcrobaticsChecked}
                      setChecked={(e) =>
                        setCharacterAcrobaticsChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="animalHandling"
                      label="Animal Handling"
                      setSavingValue={(e) =>
                        setCharacterAnimalHandling(e.target.value)
                      }
                      statSavingValue={characterAnimalHandling}
                      checkboxName="characterAnimalHandlingChecked"
                      checked={characterAnimalHandlingChecked}
                      setChecked={(e) =>
                        setCharacterAnimalHandlingChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="arcana"
                      label="Arcana"
                      setSavingValue={(e) => setCharacterArcana(e.target.value)}
                      statSavingValue={characterArcana}
                      checkboxName="characterArcanaChecked"
                      checked={characterArcanaChecked}
                      setChecked={(e) =>
                        setCharacterArcanaChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="athletics"
                      label="Athletics"
                      setSavingValue={(e) =>
                        setCharacterAthletics(e.target.value)
                      }
                      statSavingValue={characterAthletics}
                      checkboxName="characterAthleticsChecked"
                      checked={characterAthleticsChecked}
                      setChecked={(e) =>
                        setCharacterAthleticsChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="deception"
                      label="Deception"
                      setSavingValue={(e) =>
                        setCharacterDeception(e.target.value)
                      }
                      statSavingValue={characterDeception}
                      checkboxName="characterDeceptionChecked"
                      checked={characterDeceptionChecked}
                      setChecked={(e) =>
                        setCharacterDeceptionChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="history"
                      label="History"
                      setSavingValue={(e) =>
                        setCharacterHistory(e.target.value)
                      }
                      statSavingValue={characterHistory}
                      checkboxName="characterHistoryChecked"
                      checked={characterHistoryChecked}
                      setChecked={(e) =>
                        setCharacterHistoryChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="insight"
                      label="Insight"
                      setSavingValue={(e) =>
                        setCharacterInsight(e.target.value)
                      }
                      statSavingValue={characterInsight}
                      checkboxName="characterInsightChecked"
                      checked={characterInsightChecked}
                      setChecked={(e) =>
                        setCharacterInsightChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="intimidation"
                      label="Intimidation"
                      setSavingValue={(e) =>
                        setCharacterIntimidation(e.target.value)
                      }
                      statSavingValue={characterIntimidation}
                      checkboxName="characterIntimidationChecked"
                      checked={characterIntimidationChecked}
                      setChecked={(e) =>
                        setCharacterIntimidationChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="investigation"
                      label="Investigation"
                      setSavingValue={(e) =>
                        setCharacterInvestigation(e.target.value)
                      }
                      statSavingValue={characterInvestigation}
                      checkboxName="characterInvestigationChecked"
                      checked={characterInvestigationChecked}
                      setChecked={(e) =>
                        setCharacterInvestigationChecked(e.target.checked)
                      }
                    />
                  </div>
                  <div className="py-2 px-6">
                    <SavingThrows
                      savingName="medicine"
                      label="Medicine"
                      setSavingValue={(e) =>
                        setCharacterMedicine(e.target.value)
                      }
                      statSavingValue={characterMedicine}
                      checkboxName="characterMedicineChecked"
                      checked={characterMedicineChecked}
                      setChecked={(e) =>
                        setCharacterMedicineChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="nature"
                      label="Nature"
                      setSavingValue={(e) => setCharacterNature(e.target.value)}
                      statSavingValue={characterNature}
                      checkboxName="characterNatureChecked"
                      checked={characterNatureChecked}
                      setChecked={(e) =>
                        setCharacterNatureChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="perception"
                      label="Perception"
                      setSavingValue={(e) =>
                        setCharacterPerception(e.target.value)
                      }
                      statSavingValue={characterPerception}
                      checkboxName="characterPerceptionChecked"
                      checked={characterPerceptionChecked}
                      setChecked={(e) =>
                        setCharacterPerceptionChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="performance"
                      label="Performance"
                      setSavingValue={(e) =>
                        setCharacterPerformance(e.target.value)
                      }
                      statSavingValue={characterPerformance}
                      checkboxName="characterPerformanceChecked"
                      checked={characterPerformanceChecked}
                      setChecked={(e) =>
                        setCharacterPerformanceChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="persuasion"
                      label="Persuasion"
                      setSavingValue={(e) =>
                        setCharacterPersuasion(e.target.value)
                      }
                      statSavingValue={characterPersuasion}
                      checkboxName="characterPersuasionChecked"
                      checked={characterPersuasionChecked}
                      setChecked={(e) =>
                        setCharacterPersuasionChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="religion"
                      label="Religion"
                      setSavingValue={(e) =>
                        setCharacterReligion(e.target.value)
                      }
                      statSavingValue={characterReligion}
                      checkboxName="characterReligionChecked"
                      checked={characterReligionChecked}
                      setChecked={(e) =>
                        setCharacterReligionChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="slightOfHand"
                      label="Sleight of Hand"
                      setSavingValue={(e) =>
                        setCharacterSleightOfHand(e.target.value)
                      }
                      statSavingValue={characterSleightOfHand}
                      checkboxName="characterSleightOfHandChecked"
                      checked={characterSleightOfHandChecked}
                      setChecked={(e) =>
                        setCharacterSleightOfHandChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="stealth"
                      label="Stealth"
                      setSavingValue={(e) =>
                        setCharacterStealth(e.target.value)
                      }
                      statSavingValue={characterStealth}
                      checkboxName="characterStealthChecked"
                      checked={characterStealthChecked}
                      setChecked={(e) =>
                        setCharacterStealthChecked(e.target.checked)
                      }
                    />
                    <SavingThrows
                      savingName="survival"
                      label="Survival"
                      setSavingValue={(e) =>
                        setCharacterSurvival(e.target.value)
                      }
                      statSavingValue={characterSurvival}
                      checkboxName="characterSurvivalChecked"
                      checked={characterSurvivalChecked}
                      setChecked={(e) =>
                        setCharacterSurvivalChecked(e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 border-2 p-1">
                <CharacterText
                  textAreaName="featuresAndTraits"
                  label="Features & Traits"
                  setTextAreaValue={(e) =>
                    setCharacterFeaturesAndTraits(e.target.value)
                  }
                  textAreaValue={characterFeaturesAndTraits}
                />
              </div>
            </div>
          </main>
        </div>

        <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory">
          {/* Sheet Four */}
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-[300px]  h-[625px]">
              <div className="flex">
                <div className="grid grid-cols-3">
                  <div>
                    Age
                    <input
                      type="number"
                      placeholder="Age"
                      value={characterAge}
                      onChange={(e) => setCharacterAge(e.target.value)}
                      name="age"
                      className="border rounded-md p-2 w-full text-sm"
                    />
                  </div>
                  <div>
                    Height
                    <input
                      type="text"
                      placeholder="Height"
                      value={characterHeight}
                      onChange={(e) => setCharacterHeight(e.target.value)}
                      name="height"
                      className="border rounded-md p-2 w-full text-sm"
                    />
                  </div>
                  <div>
                    Weight
                    <input
                      type="text"
                      placeholder="Weight"
                      value={characterWeight}
                      onChange={(e) => setCharacterWeight(e.target.value)}
                      name="weight"
                      className="border rounded-md p-2 w-full text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div>
                  Eyes
                  <input
                    type="text"
                    placeholder="Eyes"
                    value={characterEyes}
                    onChange={(e) => setCharacterEyes(e.target.value)}
                    name="eyes"
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
                <div>
                  Skin
                  <input
                    type="text"
                    placeholder="Skin"
                    value={characterSkin}
                    onChange={(e) => setCharacterSkin(e.target.value)}
                    name="skin"
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
                <div>
                  Hair
                  <input
                    type="text"
                    placeholder="Hair"
                    value={characterHair}
                    onChange={(e) => setCharacterHair(e.target.value)}
                    name="hair"
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div>
                  <div className="space-y-1">
                    <div className="grid grid-cols-2 border-2 p-1">
                      <CharacterText
                        textAreaName="personalityTraits"
                        label="Personality Traits"
                        setTextAreaValue={(e) =>
                          setCharacterPersonalityTraits(e.target.value)
                        }
                        textAreaValue={characterPersonalityTraits}
                      />
                      <CharacterText
                        textAreaName="ideals"
                        label="Ideals"
                        setTextAreaValue={(e) =>
                          setCharacterIdeals(e.target.value)
                        }
                        textAreaValue={characterIdeals}
                      />
                      <CharacterText
                        textAreaName="bonds"
                        label="Bonds"
                        setTextAreaValue={(e) =>
                          setCharacterBonds(e.target.value)
                        }
                        textAreaValue={characterBonds}
                      />
                      <CharacterText
                        textAreaName="flaws"
                        label="Flaws"
                        setTextAreaValue={(e) =>
                          setCharacterFlaws(e.target.value)
                        }
                        textAreaValue={characterFlaws}
                      />
                    </div>
                    <div>
                      <CharacterText
                        textAreaName="proficienciesAndLanguages"
                        className="col-span-2"
                        label="Proficiencies & Languages"
                        setTextAreaValue={(e) =>
                          setCharacterProficienciesAndLanguages(e.target.value)
                        }
                        textAreaValue={characterProficienciesAndLanguages}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Sheet Five */}
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-[300px]  h-[625px]">
              <div className="mt-4 space-y-1">
                <div className="border-2 p-1">
                  <AppearanceAndBackground
                    textAreaName="characterAppearance"
                    label="Character Appearance"
                    setTextAreaValue={(e) =>
                      setCharacterDescription(e.target.value)
                    }
                    textAreaValue={characterDescription}
                  />
                </div>
                <div className="border-2 p-1">
                  <AppearanceAndBackground
                    textAreaName="characterBackground"
                    label="Character Background"
                    setTextAreaValue={(e) =>
                      setCharacterBackground(e.target.value)
                    }
                    textAreaValue={characterBackground}
                  />
                </div>
              </div>
            </div>
          </main>

          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-[300px] h-[625px] space-y-2">
              <div className="border-2 p-1 col-span-2">
                <CharacterText
                  textAreaName="alliesAndOrganizations"
                  label="Allies and Organizations"
                  setTextAreaValue={(e) =>
                    setCharacterAlliesAndOrganizations(e.target.value)
                  }
                  textAreaValue={characterAlliesAndOrganizations}
                />
              </div>

              <div className="border-2 p-1 col-span-2">
                <CharacterText
                  textAreaName="additionalFeaturesAndTraits"
                  label="Additional Features & Traits"
                  setTextAreaValue={(e) =>
                    setCharacterAdditionalFeaturesAndTraits(e.target.value)
                  }
                  textAreaValue={characterAdditionalFeaturesAndTraits}
                />
              </div>
              <div className="border-2 p-1 col-span-2">
                <CharacterText
                  textAreaName="treasures"
                  label="Treasures"
                  setTextAreaValue={(e) =>
                    setCharacterTreasures(e.target.value)
                  }
                  textAreaValue={characterTreasures}
                />
              </div>
              <div className="border-2 p-1 col-span-2">
                <CharacterText
                  textAreaName="equipment"
                  label="Equipment"
                  className="col-span-2"
                  setTextAreaValue={(e) =>
                    setCharacterEquipment(e.target.value)
                  }
                  textAreaValue={characterEquipment}
                />
              </div>
            </div>
          </main>
        </div>

        {/* Sheet Six */}
        <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory">
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[535px]">
              <div className="flex">
                <div className="grid grid-cols-3">
                  <div>
                    Spell Ability
                    <input
                      type="text"
                      placeholder="Spell Ability"
                      defaultValue={characterSpellAbility}
                      onChange={(e) => setCharacterSpellAbility(e.target.value)}
                      name="spellAbility"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Spell Save DC
                    <input
                      type="text"
                      placeholder="Spell Save DC"
                      defaultValue={characterSpellSaveDC}
                      onChange={(e) => setCharacterSpellSaveDC(e.target.value)}
                      name="spellSaveDC"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                  <div>
                    Spell Att Bonus
                    <input
                      type="text"
                      placeholder="Spell Att Bonus"
                      defaultValue={characterSpellAttackBonus}
                      onChange={(e) =>
                        setCharacterSpellAttackBonus(e.target.value)
                      }
                      name="spellAttBonus"
                      className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-md p-4 w-full">
                {/* cantrips */}
                <div className="border-2">
                  <CharacterCantrips
                    cantrip="cantripNumber"
                    label="Cantrips"
                    cantripNumber={characterCantripNumber}
                    setCantripNumber={(e) =>
                      setCharacterCantripNumber(e.target.value)
                    }
                  />
                  <SpellNames
                    spell={characterCantrip1}
                    setSpell={(e) => setCharacterCantrip1(e.target.value)}
                    checked={characterCantrip1Checked}
                    setChecked={(e) =>
                      setCharacterCantrip1Checked(e.target.checked)
                    }
                    spellName="cantrip1"
                    checkboxName="cantrip1Checked"
                  />
                  <SpellNames
                    spellName="cantrip2"
                    checkboxName="cantrip2Checked"
                    spell={characterCantrip2}
                    setSpell={(e) => setCharacterCantrip2(e.target.value)}
                    checked={characterCantrip2Checked}
                    setChecked={(e) =>
                      setCharacterCantrip2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip3"
                    checkboxName="cantrip3Checked"
                    spell={characterCantrip3}
                    setSpell={(e) => setCharacterCantrip3(e.target.value)}
                    checked={characterCantrip3Checked}
                    setChecked={(e) =>
                      setCharacterCantrip3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip4"
                    checkboxName="cantrip4Checked"
                    spell={characterCantrip4}
                    setSpell={(e) => setCharacterCantrip4(e.target.value)}
                    checked={characterCantrip4Checked}
                    setChecked={(e) =>
                      setCharacterCantrip4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip5"
                    checkboxName="cantrip5Checked"
                    spell={characterCantrip5}
                    setSpell={(e) => setCharacterCantrip5(e.target.value)}
                    checked={characterCantrip5Checked}
                    setChecked={(e) =>
                      setCharacterCantrip5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip6"
                    checkboxName="cantrip6Checked"
                    spell={characterCantrip6}
                    setSpell={(e) => setCharacterCantrip6(e.target.value)}
                    checked={characterCantrip6Checked}
                    setChecked={(e) =>
                      setCharacterCantrip6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip7"
                    checkboxName="cantrip7Checked"
                    spell={characterCantrip7}
                    setSpell={(e) => setCharacterCantrip7(e.target.value)}
                    checked={characterCantrip7Checked}
                    setChecked={(e) =>
                      setCharacterCantrip7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip8"
                    checkboxName="cantrip8Checked"
                    spell={characterCantrip8}
                    setSpell={(e) => setCharacterCantrip8(e.target.value)}
                    checked={characterCantrip8Checked}
                    setChecked={(e) =>
                      setCharacterCantrip8Checked(e.target.checked)
                    }
                  />
                </div>
              </div>
            </div>
          </main>
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[535px]">
              {/* level 1 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="1"
                  slotsTotalName="spellLevel1Total"
                  slotsTotalValue={spellLevel1Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel1Total(e.target.value)
                  }
                  slotsUsedName="spellLevel1Used"
                  slotsUsedValue={spellLevel1Used}
                  setSlotsUsedValue={(e) => setSpellLevel1Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel1Spell1"
                  spell={characterSpellLevel1Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell1Checked"
                  checked={characterSpellLevel1Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell2"
                  spell={characterSpellLevel1Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell2Checked"
                  checked={characterSpellLevel1Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell3"
                  spell={characterSpellLevel1Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell3Checked"
                  checked={characterSpellLevel1Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell4"
                  spell={characterSpellLevel1Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell4Checked"
                  checked={characterSpellLevel1Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell5"
                  spell={characterSpellLevel1Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell5Checked"
                  checked={characterSpellLevel1Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell6"
                  spell={characterSpellLevel1Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell6Checked"
                  checked={characterSpellLevel1Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell7"
                  spell={characterSpellLevel1Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell7Checked"
                  checked={characterSpellLevel1Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell8"
                  spell={characterSpellLevel1Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell8Checked"
                  checked={characterSpellLevel1Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell8Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell9"
                  spell={characterSpellLevel1Spell9}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell9(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell9Checked"
                  checked={characterSpellLevel1Spell9Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell9Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell10"
                  spell={characterSpellLevel1Spell10}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell10(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell10Checked"
                  checked={characterSpellLevel1Spell10Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell10Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell11"
                  spell={characterSpellLevel1Spell11}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell11(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell11Checked"
                  checked={characterSpellLevel1Spell11Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell11Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell12"
                  spell={characterSpellLevel1Spell12}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell12(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell12Checked"
                  checked={characterSpellLevel1Spell12Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell12Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel1Spell13"
                  spell={characterSpellLevel1Spell13}
                  setSpell={(e) =>
                    setCharacterSpellLevel1Spell13(e.target.value)
                  }
                  checkboxName="characterSpellLevel1Spell13Checked"
                  checked={characterSpellLevel1Spell13Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel1Spell13Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[535px]">
              {/* level 2 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="2"
                  slotsTotalName="spellLevel2Total"
                  slotsTotalValue={spellLevel2Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel2Total(e.target.value)
                  }
                  slotsUsedName="spellLevel2Used"
                  slotsUsedValue={spellLevel2Used}
                  setSlotsUsedValue={(e) => setSpellLevel2Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel2Spell1"
                  spell={characterSpellLevel2Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell1Checked"
                  checked={characterSpellLevel2Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell2"
                  spell={characterSpellLevel2Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell2Checked"
                  checked={characterSpellLevel2Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell3"
                  spell={characterSpellLevel2Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell3Checked"
                  checked={characterSpellLevel2Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell4"
                  spell={characterSpellLevel2Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell4Checked"
                  checked={characterSpellLevel2Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell5"
                  spell={characterSpellLevel2Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell5Checked"
                  checked={characterSpellLevel2Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell6"
                  spell={characterSpellLevel2Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell6Checked"
                  checked={characterSpellLevel2Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell7"
                  spell={characterSpellLevel2Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell7Checked"
                  checked={characterSpellLevel2Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell8"
                  spell={characterSpellLevel2Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell8Checked"
                  checked={characterSpellLevel2Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell8Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell9"
                  spell={characterSpellLevel2Spell9}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell9(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell9Checked"
                  checked={characterSpellLevel2Spell9Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell9Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell10"
                  spell={characterSpellLevel2Spell10}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell10(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell10Checked"
                  checked={characterSpellLevel2Spell10Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell10Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell11"
                  spell={characterSpellLevel2Spell11}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell11(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell11Checked"
                  checked={characterSpellLevel2Spell11Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell11Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell12"
                  spell={characterSpellLevel2Spell12}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell12(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell12Checked"
                  checked={characterSpellLevel2Spell12Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell12Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel2Spell13"
                  spell={characterSpellLevel2Spell13}
                  setSpell={(e) =>
                    setCharacterSpellLevel2Spell13(e.target.value)
                  }
                  checkboxName="characterSpellLevel2Spell13Checked"
                  checked={characterSpellLevel2Spell13Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel2Spell13Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[535px]">
              {/* level 3 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="3"
                  slotsTotalName="spellLevel3Total"
                  slotsTotalValue={spellLevel3Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel3Total(e.target.value)
                  }
                  slotsUsedName="spellLevel3Used"
                  slotsUsedValue={spellLevel3Used}
                  setSlotsUsedValue={(e) => setSpellLevel3Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel3Spell1"
                  spell={characterSpellLevel3Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell1Checked"
                  checked={characterSpellLevel3Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell2"
                  spell={characterSpellLevel3Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell2Checked"
                  checked={characterSpellLevel3Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell3"
                  spell={characterSpellLevel3Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell3Checked"
                  checked={characterSpellLevel3Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell4"
                  spell={characterSpellLevel3Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell4Checked"
                  checked={characterSpellLevel3Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell5"
                  spell={characterSpellLevel3Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell5Checked"
                  checked={characterSpellLevel3Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell6"
                  spell={characterSpellLevel3Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell6Checked"
                  checked={characterSpellLevel3Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell7"
                  spell={characterSpellLevel3Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell7Checked"
                  checked={characterSpellLevel3Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell8"
                  spell={characterSpellLevel3Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell8Checked"
                  checked={characterSpellLevel3Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell8Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell9"
                  spell={characterSpellLevel3Spell9}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell9(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell9Checked"
                  checked={characterSpellLevel3Spell9Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell9Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell10"
                  spell={characterSpellLevel3Spell10}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell10(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell10Checked"
                  checked={characterSpellLevel3Spell10Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell10Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell11"
                  spell={characterSpellLevel3Spell11}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell11(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell11Checked"
                  checked={characterSpellLevel3Spell11Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell11Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell12"
                  spell={characterSpellLevel3Spell12}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell12(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell12Checked"
                  checked={characterSpellLevel3Spell12Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell12Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel3Spell13"
                  spell={characterSpellLevel3Spell13}
                  setSpell={(e) =>
                    setCharacterSpellLevel3Spell13(e.target.value)
                  }
                  checkboxName="characterSpellLevel3Spell13Checked"
                  checked={characterSpellLevel3Spell13Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel3Spell13Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[535px]">
              {/* level 4 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="4"
                  slotsTotalName="spellLevel4Total"
                  slotsTotalValue={spellLevel4Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel4Total(e.target.value)
                  }
                  slotsUsedName="spellLevel4Used"
                  slotsUsedValue={spellLevel4Used}
                  setSlotsUsedValue={(e) => setSpellLevel4Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel4Spell1"
                  spell={characterSpellLevel4Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell1Checked"
                  checked={characterSpellLevel4Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell2"
                  spell={characterSpellLevel4Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell2Checked"
                  checked={characterSpellLevel4Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell3"
                  spell={characterSpellLevel4Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell3Checked"
                  checked={characterSpellLevel4Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell4"
                  spell={characterSpellLevel4Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell4Checked"
                  checked={characterSpellLevel4Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell5"
                  spell={characterSpellLevel4Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell5Checked"
                  checked={characterSpellLevel4Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell6"
                  spell={characterSpellLevel4Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell6Checked"
                  checked={characterSpellLevel4Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell7"
                  spell={characterSpellLevel4Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell7Checked"
                  checked={characterSpellLevel4Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell8"
                  spell={characterSpellLevel4Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell8Checked"
                  checked={characterSpellLevel4Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell8Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell9"
                  spell={characterSpellLevel4Spell9}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell9(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell9Checked"
                  checked={characterSpellLevel4Spell9Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell9Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell10"
                  spell={characterSpellLevel4Spell10}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell10(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell10Checked"
                  checked={characterSpellLevel4Spell10Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell10Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell11"
                  spell={characterSpellLevel4Spell11}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell11(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell11Checked"
                  checked={characterSpellLevel4Spell11Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell11Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell12"
                  spell={characterSpellLevel4Spell12}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell12(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell12Checked"
                  checked={characterSpellLevel4Spell12Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell12Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel4Spell13"
                  spell={characterSpellLevel4Spell13}
                  setSpell={(e) =>
                    setCharacterSpellLevel4Spell13(e.target.value)
                  }
                  checkboxName="characterSpellLevel4Spell13Checked"
                  checked={characterSpellLevel4Spell13Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel4Spell13Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>
        </div>

        {/* Sheet 7 */}
        <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory">
          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[375px]">
              {/* level 5 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="5"
                  slotsTotalName="spellLevel5Total"
                  slotsTotalValue={spellLevel5Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel5Total(e.target.value)
                  }
                  slotsUsedName="spellLevel5Used"
                  slotsUsedValue={spellLevel5Used}
                  setSlotsUsedValue={(e) => setSpellLevel5Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel5Spell1"
                  spell={characterSpellLevel5Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell1Checked"
                  checked={characterSpellLevel5Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell2"
                  spell={characterSpellLevel5Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell2Checked"
                  checked={characterSpellLevel5Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell3"
                  spell={characterSpellLevel5Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell3Checked"
                  checked={characterSpellLevel5Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell4"
                  spell={characterSpellLevel5Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell4Checked"
                  checked={characterSpellLevel5Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell5"
                  spell={characterSpellLevel5Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell5Checked"
                  checked={characterSpellLevel5Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell6"
                  spell={characterSpellLevel5Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell6Checked"
                  checked={characterSpellLevel5Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell7"
                  spell={characterSpellLevel5Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell7Checked"
                  checked={characterSpellLevel5Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel5Spell8"
                  spell={characterSpellLevel5Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel5Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel5Spell8Checked"
                  checked={characterSpellLevel5Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel5Spell8Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>

          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[375px]">
              {/* level 6 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="6"
                  slotsTotalName="spellLevel6Total"
                  slotsTotalValue={spellLevel6Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel6Total(e.target.value)
                  }
                  slotsUsedName="spellLevel6Used"
                  slotsUsedValue={spellLevel6Used}
                  setSlotsUsedValue={(e) => setSpellLevel6Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel6Spell1"
                  spell={characterSpellLevel6Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell1Checked"
                  checked={characterSpellLevel6Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell2"
                  spell={characterSpellLevel6Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell2Checked"
                  checked={characterSpellLevel6Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell3"
                  spell={characterSpellLevel6Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell3Checked"
                  checked={characterSpellLevel6Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell4"
                  spell={characterSpellLevel6Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell4Checked"
                  checked={characterSpellLevel6Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell5"
                  spell={characterSpellLevel6Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell5Checked"
                  checked={characterSpellLevel6Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell6"
                  spell={characterSpellLevel6Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell6Checked"
                  checked={characterSpellLevel6Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell7"
                  spell={characterSpellLevel6Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell7Checked"
                  checked={characterSpellLevel6Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel6Spell8"
                  spell={characterSpellLevel6Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel6Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel6Spell8Checked"
                  checked={characterSpellLevel6Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel6Spell8Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>

          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[375px]">
              {/* level 7 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="7"
                  slotsTotalName="spellLevel7Total"
                  slotsTotalValue={spellLevel7Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel7Total(e.target.value)
                  }
                  slotsUsedName="spellLevel7Used"
                  slotsUsedValue={spellLevel7Used}
                  setSlotsUsedValue={(e) => setSpellLevel7Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel7Spell1"
                  spell={characterSpellLevel7Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell1Checked"
                  checked={characterSpellLevel7Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell2"
                  spell={characterSpellLevel7Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell2Checked"
                  checked={characterSpellLevel7Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell3"
                  spell={characterSpellLevel7Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell3Checked"
                  checked={characterSpellLevel7Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell4"
                  spell={characterSpellLevel7Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell4Checked"
                  checked={characterSpellLevel7Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell5"
                  spell={characterSpellLevel7Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell5Checked"
                  checked={characterSpellLevel7Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell6"
                  spell={characterSpellLevel7Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell7Checked"
                  checked={characterSpellLevel7Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell7"
                  spell={characterSpellLevel7Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell7Checked"
                  checked={characterSpellLevel7Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel7Spell8"
                  spell={characterSpellLevel7Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel7Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel7Spell8Checked"
                  checked={characterSpellLevel7Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel7Spell8Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>

          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[375px]">
              {/* level 8 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="8"
                  slotsTotalName="spellLevel8Total"
                  slotsTotalValue={spellLevel8Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel8Total(e.target.value)
                  }
                  slotsUsedName="spellLevel8Used"
                  slotsUsedValue={spellLevel8Used}
                  setSlotsUsedValue={(e) => setSpellLevel8Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel8Spell1"
                  spell={characterSpellLevel8Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell1Checked"
                  checked={characterSpellLevel8Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell2"
                  spell={characterSpellLevel8Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell2Checked"
                  checked={characterSpellLevel8Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell3"
                  spell={characterSpellLevel8Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell3Checked"
                  checked={characterSpellLevel8Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell4"
                  spell={characterSpellLevel8Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell4Checked"
                  checked={characterSpellLevel8Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell5"
                  spell={characterSpellLevel8Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell5Checked"
                  checked={characterSpellLevel8Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell6"
                  spell={characterSpellLevel8Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell6Checked"
                  checked={characterSpellLevel8Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell7"
                  spell={characterSpellLevel8Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell7Checked"
                  checked={characterSpellLevel8Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel8Spell8"
                  spell={characterSpellLevel8Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel8Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel8Spell8Checked"
                  checked={characterSpellLevel8Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel8Spell8Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>

          <main className="flex flex-col items-center snap-always snap-center">
            <div className="bg-white rounded-md shadow-md p-4 w-full h-[375px]">
              {/* level 9 */}
              <div className="border-2 p-1">
                <CharacterSpells
                  level="9"
                  slotsTotalName="spellLevel9Total"
                  slotsTotalValue={spellLevel9Total}
                  setSlotsTotalValue={(e) =>
                    setSpellLevel9Total(e.target.value)
                  }
                  slotsUsedName="spellLevel9Used"
                  slotsUsedValue={spellLevel9Used}
                  setSlotsUsedValue={(e) => setSpellLevel9Used(e.target.value)}
                />
                <SpellNames
                  spellName="spellLevel9Spell1"
                  spell={characterSpellLevel9Spell1}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell1(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell1Checked"
                  checked={characterSpellLevel9Spell1Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell1Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell2"
                  spell={characterSpellLevel9Spell2}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell2(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell2Checked"
                  checked={characterSpellLevel9Spell2Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell2Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell3"
                  spell={characterSpellLevel9Spell3}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell3(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell3Checked"
                  checked={characterSpellLevel9Spell3Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell3Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell4"
                  spell={characterSpellLevel9Spell4}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell4(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell4Checked"
                  checked={characterSpellLevel9Spell4Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell4Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell5"
                  spell={characterSpellLevel9Spell5}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell5(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell5Checked"
                  checked={characterSpellLevel9Spell5Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell5Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell6"
                  spell={characterSpellLevel9Spell6}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell6(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell6Checked"
                  checked={characterSpellLevel9Spell6Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell6Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell7"
                  spell={characterSpellLevel9Spell7}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell7(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell7Checked"
                  checked={characterSpellLevel9Spell7Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell7Checked(e.target.checked)
                  }
                />
                <SpellNames
                  spellName="spellLevel9Spell8"
                  spell={characterSpellLevel9Spell8}
                  setSpell={(e) =>
                    setCharacterSpellLevel9Spell8(e.target.value)
                  }
                  checkboxName="characterSpellLevel9Spell8Checked"
                  checked={characterSpellLevel9Spell8Checked}
                  setChecked={(e) =>
                    setCharacterSpellLevel9Spell8Checked(e.target.checked)
                  }
                />
              </div>
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}
