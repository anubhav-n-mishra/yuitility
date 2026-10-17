"use client";
import Modal from "@/src/components/Modal";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Copy, Moon, ShieldCheck, Sun, ArrowRight, BookOpen, Award, Code2, X } from "lucide-react";
import { Tool } from "@/src/types";
import { getCategoryName, getToolFaqs, getToolHowItWorks, getToolSteps, toolPath } from "@/src/lib/site";
import { getRelatedTools } from "@/src/lib/toolRegistry";
import { getPresetsForTool } from "@/src/lib/toolPresets";
import type { DeepContent } from "@/src/lib/toolDeepContent";
import ToolDeepDive from "./ToolDeepDive";
import { BLOG_POSTS } from "@/src/lib/blogs";
import PwaInstallButton from "./PwaInstallButton";
import Header from "@/src/components/Header";
import HoverFooter from "@/src/components/ui/hover-footer";
const EmiCalculator = dynamic(() => import("@/src/components/tools/EmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SipCalculator = dynamic(() => import("@/src/components/tools/SipCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const AgeCalculator = dynamic(() => import("@/src/components/tools/AgeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PasswordGenerator = dynamic(() => import("@/src/components/tools/PasswordGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const QrCodeGenerator = dynamic(() => import("@/src/components/tools/QrCodeGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const WordCounter = dynamic(() => import("@/src/components/tools/WordCounter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ImageCompressor = dynamic(() => import("@/src/components/tools/ImageCompressor"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SalaryCalculator = dynamic(() => import("@/src/components/tools/SalaryCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const JsonFormatter = dynamic(() => import("@/src/components/tools/JsonFormatter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ColorPalette = dynamic(() => import("@/src/components/tools/ColorPalette"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfMerger = dynamic(() => import("@/src/components/tools/PdfMerger"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfSplitter = dynamic(() => import("@/src/components/tools/PdfSplitter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ImageToPdf = dynamic(() => import("@/src/components/tools/ImageToPdf"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfWatermarker = dynamic(() => import("@/src/components/tools/PdfWatermarker"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfMetadata = dynamic(() => import("@/src/components/tools/PdfMetadata"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfRotator = dynamic(() => import("@/src/components/tools/PdfRotator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfPageNumberer = dynamic(() => import("@/src/components/tools/PdfPageNumberer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfPageRemover = dynamic(() => import("@/src/components/tools/PdfPageRemover"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BackgroundRemover = dynamic(() => import("@/src/components/tools/BackgroundRemover"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ImageResizer = dynamic(() => import("@/src/components/tools/ImageResizer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FormatConverter = dynamic(() => import("@/src/components/tools/FormatConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PdfCompressor = dynamic(() => import("@/src/components/tools/PdfCompressor"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ZipExtractor = dynamic(() => import("@/src/components/tools/ZipExtractor"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const UnitConverter = dynamic(() => import("@/src/components/tools/UnitConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MemeMaker = dynamic(() => import("@/src/components/tools/MemeMaker"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FaviconGenerator = dynamic(() => import("@/src/components/tools/FaviconGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const OgImageGenerator = dynamic(() => import("@/src/components/tools/OgImageGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SocialMediaResizer = dynamic(() => import("@/src/components/tools/SocialMediaResizer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FakeDataGenerator = dynamic(() => import("@/src/components/tools/FakeDataGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PhotoCollageMaker = dynamic(() => import("@/src/components/tools/PhotoCollageMaker"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const AgeCalculatorInMonths = dynamic(() => import("@/src/components/tools/AgeCalculatorInMonths"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DogAgeCalculator = dynamic(() => import("@/src/components/tools/DogAgeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PregnancyDueDateCalculator = dynamic(() => import("@/src/components/tools/PregnancyDueDateCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const RetirementCalculator = dynamic(() => import("@/src/components/tools/RetirementCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ZodiacAgeCalculator = dynamic(() => import("@/src/components/tools/ZodiacAgeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SchoolAgeEligibilityCalculator = dynamic(() => import("@/src/components/tools/SchoolAgeEligibilityCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MedianCalculator = dynamic(() => import("@/src/components/tools/MedianCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MeanCalculator = dynamic(() => import("@/src/components/tools/MeanCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ModCalculator = dynamic(() => import("@/src/components/tools/ModCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ZodiacSunMoonCalculator = dynamic(() => import("@/src/components/tools/ZodiacSunMoonCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BmiCalculator = dynamic(() => import("@/src/components/tools/BmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DeathCalculator = dynamic(() => import("@/src/components/tools/DeathCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const LoanCalculator = dynamic(() => import("@/src/components/tools/LoanCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const EducationLoanEmiCalculator = dynamic(() => import("@/src/components/tools/EducationLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PersonalLoanEmiCalculator = dynamic(() => import("@/src/components/tools/PersonalLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BikeLoanEmiCalculator = dynamic(() => import("@/src/components/tools/BikeLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CarLoanEmiCalculator = dynamic(() => import("@/src/components/tools/CarLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const HomeLoanEmiCalculator = dynamic(() => import("@/src/components/tools/HomeLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MortgageCalculator = dynamic(() => import("@/src/components/tools/MortgageCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const InterestCalculator = dynamic(() => import("@/src/components/tools/InterestCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FdCalculator = dynamic(() => import("@/src/components/tools/FdCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const RdCalculator = dynamic(() => import("@/src/components/tools/RdCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CompoundInterestCalculator = dynamic(() => import("@/src/components/tools/CompoundInterestCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SimpleInterestCalculator = dynamic(() => import("@/src/components/tools/SimpleInterestCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PpfCalculator = dynamic(() => import("@/src/components/tools/PpfCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const GoldLoanEmiCalculator = dynamic(() => import("@/src/components/tools/GoldLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BusinessLoanEmiCalculator = dynamic(() => import("@/src/components/tools/BusinessLoanEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SwpCalculator = dynamic(() => import("@/src/components/tools/SwpCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const EpfCalculator = dynamic(() => import("@/src/components/tools/EpfCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const NpsCalculator = dynamic(() => import("@/src/components/tools/NpsCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const GratuityCalculator = dynamic(() => import("@/src/components/tools/GratuityCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const HraCalculator = dynamic(() => import("@/src/components/tools/HraCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const IncomeTaxCalculator = dynamic(() => import("@/src/components/tools/IncomeTaxCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const GstCalculator = dynamic(() => import("@/src/components/tools/GstCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CreditCardEmiCalculator = dynamic(() => import("@/src/components/tools/CreditCardEmiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const NetWorthCalculator = dynamic(() => import("@/src/components/tools/NetWorthCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const EmergencyFundCalculator = dynamic(() => import("@/src/components/tools/EmergencyFundCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const RoiCalculator = dynamic(() => import("@/src/components/tools/RoiCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CagrCalculator = dynamic(() => import("@/src/components/tools/CagrCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const IrrCalculator = dynamic(() => import("@/src/components/tools/IrrCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BreakEvenCalculator = dynamic(() => import("@/src/components/tools/BreakEvenCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ProfitMarginCalculator = dynamic(() => import("@/src/components/tools/ProfitMarginCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DiscountCalculator = dynamic(() => import("@/src/components/tools/DiscountCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CommissionCalculator = dynamic(() => import("@/src/components/tools/CommissionCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CurrencyConverterTool = dynamic(() => import("@/src/components/tools/CurrencyConverterTool"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MutualFundReturnCalculator = dynamic(() => import("@/src/components/tools/MutualFundReturnCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DividendCalculator = dynamic(() => import("@/src/components/tools/DividendCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const StockAverageCalculator = dynamic(() => import("@/src/components/tools/StockAverageCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BmrCalculator = dynamic(() => import("@/src/components/tools/BmrCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BodyFatCalculator = dynamic(() => import("@/src/components/tools/BodyFatCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const StandardCalculator = dynamic(() => import("@/src/components/tools/StandardCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ScientificCalculator = dynamic(() => import("@/src/components/tools/ScientificCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const UuidV4Generator = dynamic(() => import("@/src/components/tools/UuidV4Generator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const Base64EncoderDecoder = dynamic(() => import("@/src/components/tools/Base64EncoderDecoder"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const UrlEncoderDecoder = dynamic(() => import("@/src/components/tools/UrlEncoderDecoder"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const LoremIpsumGenerator = dynamic(() => import("@/src/components/tools/LoremIpsumGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const HashGenerator = dynamic(() => import("@/src/components/tools/HashGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const HexColorConverter = dynamic(() => import("@/src/components/tools/HexColorConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MorseCodeTranslator = dynamic(() => import("@/src/components/tools/MorseCodeTranslator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const RegexTester = dynamic(() => import("@/src/components/tools/RegexTester"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MarkdownToHtml = dynamic(() => import("@/src/components/tools/MarkdownToHtml"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MarkdownViewer = dynamic(() => import("@/src/components/tools/MarkdownViewer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DiffChecker = dynamic(() => import("@/src/components/tools/DiffChecker"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const PercentageCalculator = dynamic(() => import("@/src/components/tools/PercentageCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CgpaCalculator = dynamic(() => import("@/src/components/tools/CgpaCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CgpaToPercentage = dynamic(() => import("@/src/components/tools/CgpaToPercentage"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const GpaCalculator = dynamic(() => import("@/src/components/tools/GpaCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DateDifferenceCalculator = dynamic(() => import("@/src/components/tools/DateDifferenceCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ModeFrequencyCalculator = dynamic(() => import("@/src/components/tools/ModeFrequencyCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const StandardDeviationCalculator = dynamic(() => import("@/src/components/tools/StandardDeviationCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ProbabilityCalculator = dynamic(() => import("@/src/components/tools/ProbabilityCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PermutationCombinationCalculator = dynamic(() => import("@/src/components/tools/PermutationCombinationCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FactorialCalculator = dynamic(() => import("@/src/components/tools/FactorialCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MatrixCalculator = dynamic(() => import("@/src/components/tools/MatrixCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const QuadraticSolver = dynamic(() => import("@/src/components/tools/QuadraticSolver"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FractionToDecimal = dynamic(() => import("@/src/components/tools/FractionToDecimal"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const RatioProportionCalculator = dynamic(() => import("@/src/components/tools/RatioProportionCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const GeometryAreaCalculator = dynamic(() => import("@/src/components/tools/GeometryAreaCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const LeanBodyMassCalculator = dynamic(() => import("@/src/components/tools/LeanBodyMassCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const IdealBodyWeightCalculator = dynamic(() => import("@/src/components/tools/IdealBodyWeightCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DailyCalorieCalculator = dynamic(() => import("@/src/components/tools/DailyCalorieCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const WaterIntakeCalculator = dynamic(() => import("@/src/components/tools/WaterIntakeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MacroRatioCalculator = dynamic(() => import("@/src/components/tools/MacroRatioCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ProteinIntakeCalculator = dynamic(() => import("@/src/components/tools/ProteinIntakeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TdeeCalculator = dynamic(() => import("@/src/components/tools/TdeeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const OneRepMaxCalculator = dynamic(() => import("@/src/components/tools/OneRepMaxCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const OvulationCalculator = dynamic(() => import("@/src/components/tools/OvulationCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TargetHeartRateCalculator = dynamic(() => import("@/src/components/tools/TargetHeartRateCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const WaistHipRatioCalculator = dynamic(() => import("@/src/components/tools/WaistHipRatioCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SleepCycleCalculator = dynamic(() => import("@/src/components/tools/SleepCycleCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SmokingCostCalculator = dynamic(() => import("@/src/components/tools/SmokingCostCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const RunningPaceCalculator = dynamic(() => import("@/src/components/tools/RunningPaceCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const StepToCalorieCalculator = dynamic(() => import("@/src/components/tools/StepToCalorieCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const RoomSquareFootageCalculator = dynamic(() => import("@/src/components/tools/RoomSquareFootageCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FlooringCalculator = dynamic(() => import("@/src/components/tools/FlooringCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TileCountCalculator = dynamic(() => import("@/src/components/tools/TileCountCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PaintVolumeCalculator = dynamic(() => import("@/src/components/tools/PaintVolumeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const BrickCountCalculator = dynamic(() => import("@/src/components/tools/BrickCountCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ConcreteVolumeCalculator = dynamic(() => import("@/src/components/tools/ConcreteVolumeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CementMortarCalculator = dynamic(() => import("@/src/components/tools/CementMortarCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const AcBtuCalculator = dynamic(() => import("@/src/components/tools/AcBtuCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const TimeZoneConverter = dynamic(() => import("@/src/components/tools/TimeZoneConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

const CaseConverter = dynamic(() => import("@/src/components/tools/CaseConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CharacterCounter = dynamic(() => import("@/src/components/tools/CharacterCounter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const DuplicateLineRemover = dynamic(() => import("@/src/components/tools/DuplicateLineRemover"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TextReverser = dynamic(() => import("@/src/components/tools/TextReverser"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TextRepeater = dynamic(() => import("@/src/components/tools/TextRepeater"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SlugGenerator = dynamic(() => import("@/src/components/tools/SlugGenerator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TextToAsciiArt = dynamic(() => import("@/src/components/tools/TextToAsciiArt"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TextCleaner = dynamic(() => import("@/src/components/tools/TextCleaner"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CssMinifierBeautifier = dynamic(() => import("@/src/components/tools/CssMinifierBeautifier"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const JsMinifierBeautifier = dynamic(() => import("@/src/components/tools/JsMinifierBeautifier"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const HtmlFormatter = dynamic(() => import("@/src/components/tools/HtmlFormatter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const JsonToCsvConverter = dynamic(() => import("@/src/components/tools/JsonToCsvConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ColorFormatConverter = dynamic(() => import("@/src/components/tools/ColorFormatConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PomodoroTimer = dynamic(() => import("@/src/components/tools/PomodoroTimer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CountdownTimer = dynamic(() => import("@/src/components/tools/CountdownTimer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const WorldClock = dynamic(() => import("@/src/components/tools/WorldClock"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const NumberBaseConverter = dynamic(() => import("@/src/components/tools/NumberBaseConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const JwtDecoder = dynamic(() => import("@/src/components/tools/JwtDecoder"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const MeetingCostCalculator = dynamic(() => import("@/src/components/tools/MeetingCostCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const AgeInSecondsCalculator = dynamic(() => import("@/src/components/tools/AgeInSecondsCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ReadTimeEstimator = dynamic(() => import("@/src/components/tools/ReadTimeEstimator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SipStepUpCalculator = dynamic(() => import("@/src/components/tools/SipStepUpCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SsyCalculator = dynamic(() => import("@/src/components/tools/SsyCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CryptoProfitCalculator = dynamic(() => import("@/src/components/tools/CryptoProfitCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const CalorieDeficitCalculator = dynamic(() => import("@/src/components/tools/CalorieDeficitCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const OhmsLawCalculator = dynamic(() => import("@/src/components/tools/OhmsLawCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PowerConsumptionCalculator = dynamic(() => import("@/src/components/tools/PowerConsumptionCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SpeedDistanceTimeCalculator = dynamic(() => import("@/src/components/tools/SpeedDistanceTimeCalculator"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ImageColorPicker = dynamic(() => import("@/src/components/tools/ImageColorPicker"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ImageFlipper = dynamic(() => import("@/src/components/tools/ImageFlipper"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const SvgToPngConverter = dynamic(() => import("@/src/components/tools/SvgToPngConverter"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const PasswordStrengthChecker = dynamic(() => import("@/src/components/tools/PasswordStrengthChecker"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const TextEncryptor = dynamic(() => import("@/src/components/tools/TextEncryptor"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const FileHashVerifier = dynamic(() => import("@/src/components/tools/FileHashVerifier"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });
const ExifDataViewer = dynamic(() => import("@/src/components/tools/ExifDataViewer"), { loading: () => <p role="status" className="p-6 text-sm">Loading tool…</p> });

import ShareToast from "./ShareToast";

type ToolPageClientProps = {
  tool: Tool;
  /** Formula, worked example, pitfalls. Present only for priority pages. */
  deep?: DeepContent | null;
};

type ToolComponentProps = {
  onCopy: (value: string) => void;
  onShare: (title: string, path: string) => void;
  onTriggerShareToast?: () => void;
  presetParams?: Record<string, any>;
};

export function ToolRenderer({ tool, onCopy, onShare, onTriggerShareToast, presetParams }: { tool: Tool } & ToolComponentProps) {
  const props = { onCopy, onShare, onTriggerShareToast, ...presetParams };

  switch (tool.id) {
    case "standard-calculator": return <StandardCalculator {...props} />;
    case "scientific-calculator": return <ScientificCalculator {...props} />;
    case "emi-calculator": return <EmiCalculator {...props} />;
    case "sip-calculator": return <SipCalculator {...props} />;
    case "age-calculator": return <AgeCalculator {...props} />;
    case "password-generator": return <PasswordGenerator {...props} />;
    case "qr-code-generator": return <QrCodeGenerator {...props} />;
    case "word-counter": return <WordCounter {...props} />;
    case "image-compressor": return <ImageCompressor {...props} />;
    case "salary-calculator": return <SalaryCalculator {...props} />;
    case "json-formatter": return <JsonFormatter {...props} />;
    case "color-palette": return <ColorPalette {...props} />;
    case "pdf-merger": return <PdfMerger {...props} />;
    case "pdf-splitter": return <PdfSplitter {...props} />;
    case "image-to-pdf": return <ImageToPdf {...props} />;
    case "pdf-watermark": return <PdfWatermarker {...props} />;
    case "pdf-metadata": return <PdfMetadata {...props} />;
    case "pdf-rotator": return <PdfRotator {...props} />;
    case "pdf-page-numbers": return <PdfPageNumberer {...props} />;
    case "pdf-page-remover": return <PdfPageRemover {...props} />;
    case "background-remover": return <BackgroundRemover {...props} />;
    case "image-resizer": return <ImageResizer {...props} />;
    case "format-converter": return <FormatConverter {...props} />;
    case "pdf-compressor": return <PdfCompressor {...props} />;
    case "zip-extractor": return <ZipExtractor {...props} />;
    case "unit-converter": return <UnitConverter {...props} />;
    case "meme-maker": return <MemeMaker {...props} />;
    case "favicon-generator": return <FaviconGenerator {...props} />;
    case "og-image-generator": return <OgImageGenerator {...props} />;
    case "social-media-resizer": return <SocialMediaResizer {...props} />;
    case "fake-data-generator": return <FakeDataGenerator {...props} />;
    case "photo-collage-maker": return <PhotoCollageMaker {...props} />;
    case "age-calculator-in-months": return <AgeCalculatorInMonths {...props} />;
    case "dog-age-calculator": return <DogAgeCalculator {...props} />;
    case "pregnancy-due-date-calculator": return <PregnancyDueDateCalculator {...props} />;
    case "retirement-calculator": return <RetirementCalculator {...props} />;
    case "zodiac-age-calculator": return <ZodiacAgeCalculator {...props} />;
    case "school-age-eligibility-calculator": return <SchoolAgeEligibilityCalculator {...props} />;
    case "median-calculator": return <MedianCalculator {...props} />;
    case "mean-calculator": return <MeanCalculator {...props} />;
    case "mod-calculator": return <ModCalculator {...props} />;
    case "zodiac-sun-moon-calculator": return <ZodiacSunMoonCalculator {...props} />;
    case "bmi-calculator": return <BmiCalculator {...props} />;
    case "death-calculator": return <DeathCalculator {...props} />;
    case "loan-calculator": return <LoanCalculator {...props} />;
    case "education-loan-emi-calculator": return <EducationLoanEmiCalculator {...props} />;
    case "personal-loan-emi-calculator": return <PersonalLoanEmiCalculator {...props} />;
    case "bike-loan-emi-calculator": return <BikeLoanEmiCalculator {...props} />;
    case "car-loan-emi-calculator": return <CarLoanEmiCalculator {...props} />;
    case "home-loan-emi-calculator": return <HomeLoanEmiCalculator {...props} />;
    case "mortgage-calculator": return <MortgageCalculator {...props} />;
    case "interest-calculator": return <InterestCalculator {...props} />;
    case "fd-calculator": return <FdCalculator {...props} />;
    case "rd-calculator": return <RdCalculator {...props} />;
    case "compound-interest-calculator": return <CompoundInterestCalculator {...props} />;
    case "simple-interest-calculator": return <SimpleInterestCalculator {...props} />;
    case "ppf-calculator": return <PpfCalculator {...props} />;
    case "gold-loan-emi-calculator": return <GoldLoanEmiCalculator />;
    case "business-loan-emi-calculator": return <BusinessLoanEmiCalculator />;
    case "swp-calculator": return <SwpCalculator />;
    case "epf-calculator": return <EpfCalculator />;
    case "nps-calculator": return <NpsCalculator />;
    case "gratuity-calculator": return <GratuityCalculator />;
    case "hra-calculator": return <HraCalculator />;
    case "income-tax-calculator": return <IncomeTaxCalculator />;
    case "gst-calculator": return <GstCalculator />;
    case "credit-card-emi-calculator": return <CreditCardEmiCalculator />;
    case "net-worth-calculator": return <NetWorthCalculator />;
    case "emergency-fund-calculator": return <EmergencyFundCalculator />;
    case "roi-calculator": return <RoiCalculator />;
    case "cagr-calculator": return <CagrCalculator />;
    case "irr-calculator": return <IrrCalculator />;
    case "break-even-calculator": return <BreakEvenCalculator />;
    case "profit-margin-calculator": return <ProfitMarginCalculator />;
    case "discount-calculator": return <DiscountCalculator />;
    case "commission-calculator": return <CommissionCalculator />;
    case "currency-converter": return <CurrencyConverterTool />;
    case "mutual-fund-return-calculator": return <MutualFundReturnCalculator />;
    case "dividend-calculator": return <DividendCalculator />;
    case "stock-average-calculator": return <StockAverageCalculator />;
    case "bmr-calculator": return <BmrCalculator />;
    case "body-fat-calculator": return <BodyFatCalculator />;

    case "uuid-v4-generator": return <UuidV4Generator {...props} />;
    case "base64-encoder-decoder": return <Base64EncoderDecoder {...props} />;
    case "url-encoder-decoder": return <UrlEncoderDecoder {...props} />;
    case "lorem-ipsum-generator": return <LoremIpsumGenerator {...props} />;
    case "hash-generator-md5-sha": return <HashGenerator {...props} />;
    case "hex-color-converter": return <HexColorConverter {...props} />;
    case "morse-code-translator": return <MorseCodeTranslator {...props} />;
    case "regex-tester": return <RegexTester {...props} />;
    case "markdown-to-html": return <MarkdownToHtml {...props} />;
    case "markdown-viewer": return <MarkdownViewer {...props} />;
    case "diff-checker": return <DiffChecker {...props} />;

    case "percentage-calculator": return <PercentageCalculator {...props} />;
    case "cgpa-calculator": return <CgpaCalculator {...props} />;
    case "cgpa-to-percentage-calculator": return <CgpaToPercentage {...props} />;
    case "gpa-calculator": return <GpaCalculator {...props} />;
    case "date-difference-calculator": return <DateDifferenceCalculator {...props} />;
    case "mode-frequency-calculator": return <ModeFrequencyCalculator {...props} />;
    case "standard-deviation-calculator": return <StandardDeviationCalculator {...props} />;
    case "probability-calculator": return <ProbabilityCalculator {...props} />;
    case "permutation-combination-calculator": return <PermutationCombinationCalculator {...props} />;
    case "factorial-calculator": return <FactorialCalculator {...props} />;
    case "matrix-calculator": return <MatrixCalculator {...props} />;
    case "quadratic-solver": return <QuadraticSolver {...props} />;
    case "fraction-to-decimal-converter": return <FractionToDecimal {...props} />;
    case "ratio-proportion-calculator": return <RatioProportionCalculator {...props} />;
    case "geometry-area-calculator": return <GeometryAreaCalculator {...props} />;

    case "lean-body-mass-calculator": return <LeanBodyMassCalculator {...props} />;
    case "ideal-body-weight-calculator": return <IdealBodyWeightCalculator {...props} />;
    case "daily-calorie-calculator": return <DailyCalorieCalculator {...props} />;
    case "water-intake-calculator": return <WaterIntakeCalculator {...props} />;
    case "macro-ratio-calculator": return <MacroRatioCalculator {...props} />;
    case "protein-intake-calculator": return <ProteinIntakeCalculator {...props} />;
    case "tdee-calculator": return <TdeeCalculator {...props} />;
    case "one-rep-max-calculator": return <OneRepMaxCalculator {...props} />;
    case "ovulation-calculator": return <OvulationCalculator {...props} />;
    case "target-heart-rate-calculator": return <TargetHeartRateCalculator {...props} />;
    case "waist-hip-ratio-calculator": return <WaistHipRatioCalculator {...props} />;
    case "sleep-cycle-calculator": return <SleepCycleCalculator {...props} />;
    case "smoking-cost-calculator": return <SmokingCostCalculator {...props} />;
    case "running-pace-calculator": return <RunningPaceCalculator {...props} />;
    case "step-to-calorie-calculator": return <StepToCalorieCalculator {...props} />;

    case "room-square-footage-calculator": return <RoomSquareFootageCalculator {...props} />;
    case "flooring-calculator": return <FlooringCalculator {...props} />;
    case "tile-count-calculator": return <TileCountCalculator {...props} />;
    case "paint-volume-calculator": return <PaintVolumeCalculator {...props} />;
    case "brick-count-calculator": return <BrickCountCalculator {...props} />;
    case "concrete-volume-calculator": return <ConcreteVolumeCalculator {...props} />;
    case "cement-mortar-calculator": return <CementMortarCalculator {...props} />;
    case "ac-btu-calculator": return <AcBtuCalculator {...props} />;

    case "time-zone-converter": return <TimeZoneConverter {...props} />;

    case "case-converter": return <CaseConverter {...props} />;
    case "character-counter": return <CharacterCounter {...props} />;
    case "duplicate-line-remover": return <DuplicateLineRemover {...props} />;
    case "text-reverser": return <TextReverser {...props} />;
    case "text-repeater": return <TextRepeater {...props} />;
    case "slug-generator": return <SlugGenerator {...props} />;
    case "text-to-ascii-art": return <TextToAsciiArt {...props} />;
    case "text-cleaner": return <TextCleaner {...props} />;
    case "css-minifier-beautifier": return <CssMinifierBeautifier {...props} />;
    case "js-minifier-beautifier": return <JsMinifierBeautifier {...props} />;
    case "html-formatter": return <HtmlFormatter {...props} />;
    case "json-to-csv-converter": return <JsonToCsvConverter {...props} />;
    case "color-format-converter": return <ColorFormatConverter {...props} />;
    case "pomodoro-timer": return <PomodoroTimer {...props} />;
    case "countdown-timer": return <CountdownTimer {...props} />;
    case "world-clock": return <WorldClock {...props} />;
    case "number-base-converter": return <NumberBaseConverter {...props} />;
    case "jwt-decoder": return <JwtDecoder {...props} />;
    case "meeting-cost-calculator": return <MeetingCostCalculator {...props} />;
    case "age-in-seconds-calculator": return <AgeInSecondsCalculator {...props} />;
    case "read-time-estimator": return <ReadTimeEstimator {...props} />;
    case "sip-step-up-calculator": return <SipStepUpCalculator {...props} />;
    case "ssy-calculator": return <SsyCalculator {...props} />;
    case "crypto-profit-calculator": return <CryptoProfitCalculator {...props} />;
    case "calorie-deficit-calculator": return <CalorieDeficitCalculator {...props} />;
    case "ohms-law-calculator": return <OhmsLawCalculator {...props} />;
    case "power-consumption-calculator": return <PowerConsumptionCalculator {...props} />;
    case "speed-distance-time-calculator": return <SpeedDistanceTimeCalculator {...props} />;
    case "image-color-picker": return <ImageColorPicker {...props} />;
    case "image-flipper": return <ImageFlipper {...props} />;
    case "svg-to-png-converter": return <SvgToPngConverter {...props} />;
    case "password-strength-checker": return <PasswordStrengthChecker {...props} />;
    case "text-encryptor": return <TextEncryptor {...props} />;
    case "file-hash-verifier": return <FileHashVerifier {...props} />;
    case "exif-data-viewer": return <ExifDataViewer {...props} />;

    default: return <p role="status" className="p-6">This tool is not available yet. Please choose another tool from the directory.</p>;
  }
}

export default function ToolPageClient({ tool, deep }: ToolPageClientProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => { setDarkMode(document.documentElement.classList.contains('dark')); }, []);
  const [message, setMessage] = useState("");
  const [showShareToast, setShowShareToast] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const embedSnippet = `<iframe src="https://www.yuitility.app/embed/${tool.id}" width="100%" height="700" frameborder="0" style="border:1px solid #e4e4e7; border-radius:16px; overflow:hidden;" title="${tool.title}"></iframe>\n<p style="font-size:12px;text-align:right;margin-top:4px;font-family:sans-serif;"><a href="https://www.yuitility.app/tools/${tool.id}" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:none;">⚡ Free ${tool.title} by Yuitility</a></p>`;

  const faqs = useMemo(() => getToolFaqs(tool), [tool]);
  const steps = useMemo(() => getToolSteps(tool), [tool]);
  const howItWorks = useMemo(() => getToolHowItWorks(tool), [tool]);
  const relatedTools = useMemo(() => getRelatedTools(tool, 4), [tool]);
  const presets = useMemo(() => getPresetsForTool(tool.id), [tool.id]);

  const linkedGuide = useMemo(
    () => BLOG_POSTS.find((p) => p.toolId === tool.id),
    [tool],
  );

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${tool.id}`);
    if (savedRating) {
      setUserRating(parseInt(savedRating, 10));
    }
  }, [tool.id]);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (customEvent.detail !== darkMode) {
        setDarkMode(customEvent.detail);
      }
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [darkMode]);

  const showMessage = (value: string) => {
    setMessage(value);
    window.setTimeout(() => setMessage(""), 2400);
  };

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showMessage("Copied to clipboard.");
    } catch {
      showMessage("Copy failed. Please select and copy the value manually.");
    }
  };

  const share = async (title: string, legacyPath: string) => {
    const cleaned = legacyPath.replace(/^#\/?/, "").replace(/^\/?tools\//, "").replace(/^\//, "");
    const slug = cleaned || tool.id;
    const url = `${window.location.origin}${toolPath(slug)}`;
    await copy(url);
    showMessage(`Share link for ${title} copied.`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 sm:pt-36">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-cyan-300">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/tools" className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-cyan-300"><ArrowLeft className="h-3.5 w-3.5" /> All tools</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/category/${tool.category}`} className="hover:text-blue-600 dark:hover:text-cyan-300">{getCategoryName(tool.category)}</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-800 dark:text-zinc-100">{tool.title}</span>
        </nav>

        {/* Primary Semantic H1 and Social Sharing */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-zinc-950 dark:text-white">
              {tool.title}
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl">
              {tool.longDescription}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                const url = `${window.location.origin}${toolPath(tool.id)}`;
                const text = encodeURIComponent(`Try this free browser-based ${tool.title} on Yuitility: ${url}`);
                window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95"
              aria-label="Share via WhatsApp"
            >
              Share WhatsApp
            </button>
            <button
              type="button"
              onClick={() => share(tool.title, toolPath(tool.id))}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95"
              aria-label="Copy tool link"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Link
            </button>
            <button
              type="button"
              onClick={() => setShowEmbedModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95"
              aria-label="Embed this tool"
            >
              <Code2 className="w-3.5 h-3.5" /> Embed
            </button>
          </div>
        </div>

        {/* 1. Usable Tool Component (Top Priority) */}
        <section aria-label={`${tool.title} workspace`} className="mb-6 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <ToolRenderer tool={tool} onCopy={copy} onShare={share} onTriggerShareToast={() => setShowShareToast(true)} />
        </section>

        {/* Interactive 5-Star Micro Poll (Client-side Only, strictly no aggregateRating schema) */}
        <section className="mb-8 rounded-2xl border border-zinc-200/80 bg-white dark:bg-zinc-900/60 dark:border-zinc-800 p-5 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Was this {tool.title.toLowerCase().includes("calculator") ? "calculator" : "tool"} helpful and accurate?
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Your rating stays in this browser and is not sent to us. Use Contact to report an issue.
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center justify-center sm:justify-end gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setUserRating(star);
                  localStorage.setItem(`rating_${tool.id}`, star.toString());
                  showMessage(`Thank you for rating this tool ${star} out of 5 stars!`);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  (userRating || 0) >= star
                    ? "text-amber-400 hover:text-amber-500"
                    : "text-zinc-300 dark:text-zinc-700 hover:text-amber-400"
                }`}
                aria-label={`Rate ${star} out of 5 stars`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            {userRating && (
              <span className="ml-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Rated {userRating}/5 ★
              </span>
            )}
          </div>
        </section>

        {/* 1.5. Interactive Preset Internal Link Hub (if presets exist for this tool) */}
        {presets.length > 0 && (
          <section aria-label={`${tool.title} presets and institutional formulas`} className="mb-8 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  <h2 className="text-lg font-display font-bold text-zinc-950 dark:text-white">
                    Presets &amp; Formula Scenarios
                  </h2>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
                  Explore pre-filled assumptions and calculation scenarios for {tool.title.toLowerCase()}.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-zinc-800 dark:text-cyan-300">
                {presets.length} Presets
              </span>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {presets.map((preset) => (
                <Link
                  key={preset.presetSlug}
                  href={`/tools/${tool.id}/${preset.presetSlug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-cyan-500/60 dark:hover:bg-zinc-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-800 dark:bg-zinc-800 dark:text-cyan-300">
                        {preset.badge || "Preset"}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-cyan-300 transition-colors">
                      {preset.h1}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {preset.seoDescription}
                    </p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-zinc-200/50 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-cyan-300">
                    <span>Open preset calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 2. Embed Calculator Section for Bloggers & Webmasters */}
        <section aria-label="Embed calculator widget" className="mb-8 rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 p-6 shadow-sm dark:border-blue-900/40 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-cyan-950/20 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3.5">
            <div className="flex items-start gap-3">
              <span className="p-2.5 rounded-2xl bg-blue-600 text-white dark:bg-cyan-500 dark:text-zinc-950 shrink-0 shadow-md">
                <Code2 className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-display font-bold text-zinc-950 dark:text-white">
                    Embed This {tool.title} On Your Website
                  </h2>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Free Embed
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-2xl">
                  Add this fast, responsive, browser-based calculator directly to your blog, university portal, or company site. No API key required. Check the tool’s assumptions and limitations before sharing results.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  copy(embedSnippet);
                  showMessage("Embed snippet copied to clipboard! Paste into your CMS or HTML.");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95 dark:bg-cyan-500 dark:text-zinc-950 dark:hover:bg-cyan-400"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Embed Code
              </button>
              <a
                href={`/embed/${tool.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all"
              >
                Preview Widget <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="relative">
            <textarea aria-label="Embed Snippet"
              readOnly
              rows={2}
              value={embedSnippet}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              className="w-full rounded-xl border border-zinc-200 bg-white/90 dark:bg-zinc-950 p-2.5 text-[11px] font-mono text-zinc-700 select-all outline-none dark:border-zinc-800 dark:text-zinc-300 resize-none shadow-inner"
            />
          </div>
        </section>

        {/* 3. Tool Info & How It Works Card */}
        <div className="mb-8 flex flex-col gap-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-cyan-950/30 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">{getCategoryName(tool.category)}</p>
              <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-950 dark:text-white mb-2">About the {tool.title}</h2>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{tool.longDescription}</p>
            </div>
          </div>

          <div className="border-t border-blue-200/60 pt-5 dark:border-zinc-800">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-cyan-300 mb-1.5">How the {tool.title} Works</h2>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">{howItWorks}</p>
          </div>
        </div>

        {/* Share Toast Modal */}
        <ShareToast
          toolTitle={tool.title}
          toolId={tool.id}
          show={showShareToast}
          onClose={() => setShowShareToast(false)}
        />

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">How to use the {tool.title}</h2>
            <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">{tool.description} Yuitility keeps the workflow fast and focused, so you can complete the job without creating an account.</p>
            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-cyan-500/20 dark:text-cyan-300">{index + 1}</span><span>{step}</span></li>)}
            </ol>
          </article>
          <aside className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
              <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <h2 className="mt-4 font-display text-xl font-bold text-zinc-950 dark:text-white">{tool.title} Privacy &amp; Security</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                This tool processes its inputs in your browser. The optional AI assistant and contact form send their messages to a server; avoid copying private tool data into them.
              </p>
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">How to Verify in Browser DevTools</h3>
                <ol className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">1.</span>
                    <span>Open Developer Tools by pressing <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">F12</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">Cmd+Option+I</kbd>).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">2.</span>
                    <span>Switch to the <strong>Network</strong> tab.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">3.</span>
                    <span>Run the tool and inspect request payloads. Tool code or models may download; your input files should not be uploaded. AI chat and contact messages use separate server endpoints.</span>
                  </li>
                </ol>
              </div>
            </div>

          </aside>
        </section>

        {deep && <ToolDeepDive tool={tool} deep={deep} />}

        {faqs.length > 0 && <section className="mt-12">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Frequently Asked Questions about the {tool.title}</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Frequently asked questions about calculation formulas, privacy, and usage.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white leading-snug">{faq.question}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>}

        {relatedTools.length > 0 && <section className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Tools Related to {tool.title}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Tools that pair with the {tool.title.toLowerCase()} in the same task.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((related) => <Link key={related.id} href={toolPath(related.id)} className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-500/60"><h3 className="font-display font-bold text-zinc-950 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300">{related.title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{related.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-cyan-300">Open the {related.title.toLowerCase()} <span aria-hidden="true">→</span></span></Link>)}
          </div>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            See every tool in <Link href={`/category/${tool.category}`} className="font-semibold text-blue-600 hover:underline dark:text-cyan-300">{getCategoryName(tool.category)}</Link>, or browse <Link href="/tools" className="font-semibold text-blue-600 hover:underline dark:text-cyan-300">all Yuitility tools</Link>.
          </p>
        </section>}

        {/* Embed Widget Modal */}
        {showEmbedModal && (
          <Modal label="Embed this tool" onClose={() => setShowEmbedModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
              <button
                type="button"
                onClick={() => setShowEmbedModal(false)}
                className="absolute top-5 right-5 rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
                aria-label="Close embed modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Code2 className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white">
                  Embed &ldquo;{tool.title}&rdquo;
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                Add this interactive tool to your website. Calculations run in the embedded browser frame. See the tool’s assumptions before sharing results.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">HTML Embed Snippet</label>
                  <span className="text-[10px] text-zinc-600 font-mono">iframe responsive standard</span>
                </div>
                <textarea aria-label="HTML Embed Snippet"
                  readOnly
                  rows={4}
                  value={embedSnippet}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs font-mono text-zinc-800 select-all outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 resize-none"
                />
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    copy(embedSnippet);
                    showMessage("Embed snippet copied to clipboard!");
                  }}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 dark:bg-cyan-500 dark:text-zinc-950 dark:hover:bg-cyan-400 transition"
                >
                  <Copy className="w-4 h-4" />
                  Copy Embed Code
                </button>
                <a
                  href={`/embed/${tool.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
                >
                  Preview Widget <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Modal>
        )}
      </main>

      <HoverFooter />
      {message && <div role="status" className="fixed bottom-5 right-5 flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-zinc-950"><CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />{message}</div>}
    </div>
  );
}
